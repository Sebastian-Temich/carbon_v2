from uuid import UUID

from flask import abort, jsonify

from application.services.project_service import ProjectService
from domain.entities import Project


def handle_get_project(project_id: UUID):
    project = Project.query.get(project_id)
    if not project:
        abort(404, 'Project not found')

    project_response = ProjectService.get_project_response(project)
    response = jsonify(project_response.dict())
    return response, 200
