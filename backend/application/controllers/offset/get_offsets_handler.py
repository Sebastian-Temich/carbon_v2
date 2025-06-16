from flask import jsonify, Response
from flask_sqlalchemy.query import Query
from sqlalchemy import extract, and_

from application.config import Config
from application.services.offset_service import OffsetService
from application.utils.pagination import set_pagination_metadata
from domain.dto.query_params.offset_query import OffsetQuery
from domain.entities import Offset, SustainableDevelopmentGoal, Project


def handle_get_offsets(query: OffsetQuery) -> tuple[Response, int]:
    offsets = Offset.query.order_by(Offset.created_at.desc())
    offsets = filter_project_fields(query, offsets)
    offsets = filter_offset_fields(query, offsets)
    offsets = offsets.paginate(page=query.page, per_page=query.per_page, max_per_page=Config.PAGINATION_LIMIT)

    offset_responses = [OffsetService.get_offset_response(offset) for offset in offsets.items]
    offset_dict_responses = [offset_response.dict() for offset_response in offset_responses]

    response = jsonify(offset_dict_responses)
    set_pagination_metadata(response, offsets)
    return response, 200


def filter_project_fields(query: OffsetQuery, offsets: Query) -> Query:
    if query.project_name:
        offsets = offsets \
            .join(Offset.project) \
            .filter(Project.name.ilike(f'%{query.project_name}%'))

    if query.project_location_country_id:
        offsets = offsets \
            .join(Offset.project) \
            .filter(Project.country_id == query.project_location_country_id)

    if query.project_standard_id:
        offsets = offsets \
            .join(Offset.project) \
            .filter(Project.project_standard_id == query.project_standard_id)

    if query.project_unit_generation_start_date:
        offsets = offsets \
            .join(Offset.project) \
            .filter(Project.unit_generation_start_date >= query.project_unit_generation_start_date)

    if query.project_unit_generation_end_date:
        offsets = offsets \
            .join(Offset.project) \
            .filter(Project.unit_generation_end_date <= query.project_unit_generation_end_date)

    if query.project_start_date:
        offsets = offsets \
            .join(Offset.project) \
            .filter(Project.start_date >= query.project_start_date)

    if query.project_expected_end_date:
        offsets = offsets \
            .join(Offset.project) \
            .filter(Project.expected_end_date <= query.project_expected_end_date)

    if query.project_sustainable_development_goal_ids:
        offsets = offsets.join(Offset.project).filter(
            and_(
                *[Project.sustainable_development_goals.any(
                    SustainableDevelopmentGoal.id == sdg_id
                ) for sdg_id in query.project_sustainable_development_goal_ids]
            )
        )

    if query.project_circularity:
        offsets = offsets \
            .join(Offset.project) \
            .filter(Project.circularity.ilike(f'%{query.project_circularity}%'))

    return offsets


def filter_offset_fields(query: OffsetQuery, offsets: Query) -> Query:
    if query.unit_count_min:
        offsets = offsets.filter(Offset.unit_count >= query.unit_count_min)

    if query.unit_count_max:
        offsets = offsets.filter(Offset.unit_count <= query.unit_count_max)

    if query.unit_price_min:
        offsets = offsets.filter(Offset.unit_price >= query.unit_price_min)

    if query.unit_price_max:
        offsets = offsets.filter(Offset.unit_price <= query.unit_price_max)

    if query.unit_type_id:
        offsets = offsets.filter(Offset.unit_type_id == query.unit_type_id)

    if query.audit_unit_id:
        offsets = offsets.filter(Offset.audit_unit_id == query.audit_unit_id)

    if query.unit_creation_year:
        offsets = offsets.filter(extract('year', Offset.unit_creation_year) == query.unit_creation_year.year)

    if query.owned_by_company_id:
        offsets = offsets.filter(Offset.owned_by_company_id == query.owned_by_company_id)

    if query.status_ids:
        offsets = offsets.filter(Offset.offset_status_id.in_(query.status_ids))

    if query.currency_ids:
        offsets = offsets.filter(Offset.currency_id.in_(query.currency_ids))

    if query.is_owner_original is not None:
        if query.is_owner_original:
            offsets = offsets \
                .join(Offset.project) \
                .filter(Offset.owned_by_company_id == Project.company_id)
        else:
            offsets = offsets \
                .join(Offset.project) \
                .filter(Offset.owned_by_company_id != Project.company_id)

    return offsets
