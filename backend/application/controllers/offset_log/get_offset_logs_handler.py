import sys
from uuid import UUID

from flask import jsonify, Response
from flask_sqlalchemy.pagination import Pagination
from sqlalchemy import and_, func, or_
from sqlalchemy.orm import Query

from application import Config
from application.services.project_service import ProjectService
from application.utils.pagination import set_pagination_metadata
from domain.dto.offset_logs.responses.offset_log_offset_response import OffsetLogOffsetResponse
from domain.dto.offset_logs.responses.offset_log_response import OffsetLogResponse
from domain.dto.offset_logs.responses.offset_logs_and_statistics_response import OffsetLogsAndStatisticsResponse
from domain.dto.query_params.offset_logs_query import OffsetLogsQuery
from domain.entities import Project, Offset, OffsetLog, SustainableDevelopmentGoal, OffsetStatus
from domain.enums.offset_status_enum import OffsetStatuses


def handle_get_offset_logs(query: OffsetLogsQuery) -> tuple[Response, int]:
    projects_query = query_projects(query)
    project_ids = [project.id for project in projects_query]

    offsets_query = query_offsets(project_ids, query)
    offset_ids = [offset.id for offset in offsets_query]

    paginated_offset_logs = OffsetLog.query \
        .filter(or_(OffsetLog.source_offset_id.in_(offset_ids), OffsetLog.target_offset_id.in_(offset_ids))) \
        .order_by(OffsetLog.created_at.desc()) \
        .paginate(page=query.page, per_page=query.per_page, max_per_page=Config.PAGINATION_LIMIT)

    offset_statistics_response = create_offset_statistics_response(offset_ids, paginated_offset_logs)

    response = jsonify(offset_statistics_response.dict())
    set_pagination_metadata(response, paginated_offset_logs)

    return response, 200


def query_offsets(project_ids: list[UUID], query: OffsetLogsQuery) -> Query:
    offsets_query = Offset.query.filter(Offset.project_id.in_(project_ids))

    if query.unit_type_ids:
        offsets_query = offsets_query.filter(Offset.unit_type_id.in_(query.unit_type_ids))

    if query.audit_unit_ids:
        offsets_query = offsets_query.filter(Offset.audit_unit_id.in_(query.audit_unit_ids))

    return offsets_query


def query_projects(query: OffsetLogsQuery) -> Query:
    projects_query = Project.query

    if query.project_ids:
        projects_query = projects_query.filter(Project.id.in_(query.project_ids))

    if query.project_name:
        projects_query = projects_query.filter(Project.name.ilike(f'%{query.project_name}%'))

    if query.project_sdg_ids:
        projects_query = projects_query.filter(
            and_(
                *[Project.sustainable_development_goals.any(
                    SustainableDevelopmentGoal.id == sdg_id
                ) for sdg_id in query.project_sdg_ids]
            )
        )

    if query.project_standard_ids:
        projects_query = projects_query.filter(Project.project_standard_id.in_(query.project_standard_ids))

    if query.project_country_ids:
        projects_query = projects_query.filter(Project.country_id.in_(query.project_country_ids))

    if query.project_creation_date_from:
        projects_query = projects_query.filter(Project.created_at >= query.project_creation_date_from)

    if query.project_creation_date_to:
        projects_query = projects_query.filter(Project.created_at <= query.project_creation_date_to)

    if query.project_total_unit_count_to or query.project_total_unit_count_from:
        unit_count_from = query.project_total_unit_count_from if query.project_total_unit_count_from else 0
        unit_count_to = query.project_total_unit_count_to if query.project_total_unit_count_to else sys.maxsize

        offsets = Offset.query.group_by(Offset.project_id)
        unit_counts_by_project = offsets.with_entities(Offset.project_id, func.sum(Offset.unit_count))
        projects_ids_with_total_unit_count_between = [
            project_id for project_id, unit_count
            in unit_counts_by_project
            if unit_count_from <= unit_count <= unit_count_to
        ]

        projects_query = projects_query.filter(Project.id.in_(projects_ids_with_total_unit_count_between))

    return projects_query


def create_project_transaction_history_responses(offset_logs: list[OffsetLog]) -> list[OffsetLogResponse]:
    offset_log_responses = []
    for offset_log in offset_logs:
        offset_log_response = OffsetLogResponse(
            id=offset_log.id,
            source_offset=create_offset_log_offset_response(offset_log.source_offset),
            target_offset=create_offset_log_offset_response(offset_log.target_offset),
            unit_price=offset_log.unit_price,
            unit_count=offset_log.unit_count,
            unit_type=offset_log.source_offset.unit_type.name,
            audit_unit=offset_log.source_offset.audit_unit.name,
            action=offset_log.action,
            company=offset_log.company,
            project=ProjectService.get_short_project_response(offset_log.source_offset.project),
            currency=offset_log.target_offset.currency.code,
            created_at=offset_log.created_at
        )
        offset_log_responses.append(offset_log_response)

    return offset_log_responses


def create_offset_statistics_response(offset_ids: list[UUID],
                                      paginated_offset_logs: Pagination) -> OffsetLogsAndStatisticsResponse:
    total_unit_count = get_total_offset_unit_count(offset_ids)
    not_sold_unit_count = get_not_sold_unit_count(offset_ids)
    sold_unit_count = total_unit_count - not_sold_unit_count
    retired_unit_count = get_retired_unit_count(offset_ids)

    offset_log_responses = create_project_transaction_history_responses(paginated_offset_logs.items)
    offset_log_responses_as_dicts = [offset_log_response.dict() for offset_log_response in offset_log_responses]
    offset_statistics_response = OffsetLogsAndStatisticsResponse(
        total_unit_count=total_unit_count,
        sold_unit_count=sold_unit_count,
        not_sold_unit_count=not_sold_unit_count,
        retired_unit_count=retired_unit_count,
        sold_and_not_retired_unit_count=sold_unit_count - retired_unit_count,
        offset_logs=offset_log_responses_as_dicts
    )
    return offset_statistics_response


def create_offset_log_offset_response(offset: Offset):
    offset_log_offset_response = OffsetLogOffsetResponse(
        id=offset.id,
        company=offset.owned_by_company
    )

    return offset_log_offset_response


def get_total_offset_unit_count(offset_ids: list[UUID]) -> int:
    total_unit_count = Offset.query \
                           .filter(Offset.id.in_(offset_ids)) \
                           .with_entities(func.sum(Offset.unit_count)) \
                           .scalar() or 0

    return total_unit_count


def get_not_sold_unit_count(offset_ids: list[UUID]) -> int:
    not_sold_unit_count = Offset.query \
                              .filter(Offset.id.in_(offset_ids)) \
                              .join(OffsetStatus) \
                              .filter(OffsetStatus.name == OffsetStatuses.ACCEPTED) \
                              .with_entities(func.sum(Offset.unit_count)) \
                              .scalar() or 0

    return not_sold_unit_count


def get_retired_unit_count(offset_ids: list[UUID]) -> int:
    retired_unit_count = Offset.query \
                             .filter(Offset.id.in_(offset_ids)) \
                             .join(OffsetStatus) \
                             .filter(OffsetStatus.name == OffsetStatuses.RETIRED) \
                             .with_entities(func.sum(Offset.unit_count)) \
                             .scalar() or 0

    return retired_unit_count
