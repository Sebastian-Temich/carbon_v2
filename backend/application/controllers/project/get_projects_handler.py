import sys

from flask import jsonify, Response
from sqlalchemy import and_, cast, Date
from sqlalchemy.orm import Query

from application.config import Config
from application.services.project_service import ProjectService
from application.utils.pagination import set_pagination_metadata
from domain.dto.query_params.project_query import ProjectQuery
from domain.entities import Project, SustainableDevelopmentGoal


def handle_get_projects(query: ProjectQuery) -> tuple[Response, int]:
    projects_query = query_projects(query)
    projects_query = projects_query.order_by(Project.created_at.desc())
    projects = projects_query.paginate(page=query.page, per_page=query.per_page, max_per_page=Config.PAGINATION_LIMIT)

    project_responses = [ProjectService.get_project_response(project) for project in projects.items]
    project_dict_responses = [project_response.dict() for project_response in project_responses]

    response = jsonify(project_dict_responses)
    set_pagination_metadata(response, projects)
    return response, 200


def query_projects(query: ProjectQuery) -> Query:
    projects_query = Project.query

    if query.name:
        projects_query = projects_query.filter(Project.name.ilike(f'%{query.name}%'))

    if query.company_id:
        projects_query = projects_query.filter(Project.company_id == query.company_id)

    if query.sdg_ids:
        projects_query = projects_query.filter(
            and_(
                *[Project.sustainable_development_goals.any(
                    SustainableDevelopmentGoal.id == sdg_id
                ) for sdg_id in query.sdg_ids]
            )
        )

    if query.unit_type_ids:
        projects_query = projects_query.filter(
            and_(
                *[Project.offsets.any(unit_type_id=unit_type_id) for unit_type_id in query.unit_type_ids]
            )
        )

    if query.audit_unit_ids:
        projects_query = projects_query.filter(
            and_(
                *[Project.offsets.any(audit_unit_id=audit_unit_id) for audit_unit_id in query.audit_unit_ids]
            )
        )

    if query.project_standard_ids:
        projects_query = projects_query.filter(Project.project_standard_id.in_(query.project_standard_ids))

    if query.country_ids:
        projects_query = projects_query.filter(Project.country_id.in_(query.country_ids))

    if query.creation_date_from:
        projects_query = projects_query.filter(cast(Project.created_at, Date) >= query.creation_date_from)

    if query.creation_date_to:
        projects_query = projects_query.filter(cast(Project.created_at, Date) <= query.creation_date_to)

    if query.total_unit_count_from is not None or query.total_unit_count_to is not None:
        unit_count_from = query.total_unit_count_from if query.total_unit_count_from is not None else 0
        unit_count_to = query.total_unit_count_to if query.total_unit_count_to is not None else sys.maxsize
        project_ids_with_expected_total_unit_count = [
            project.id for project in projects_query
            if unit_count_from <= get_project_total_unit_count(project) <= unit_count_to
        ]

        projects_query = projects_query.filter(Project.id.in_(project_ids_with_expected_total_unit_count))

    return projects_query


def get_project_total_unit_count(project: Project) -> int:
    return sum([offset.unit_count for offset in project.offsets])
