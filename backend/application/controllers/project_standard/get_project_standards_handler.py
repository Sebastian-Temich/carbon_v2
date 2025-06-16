from automapper import mapper
from flask import jsonify

from domain.dto.project_standard.responses.project_standard_response import ProjectStandardResponse
from domain.entities.project_standard import ProjectStandard


def handle_get_project_standards():
    project_standards = ProjectStandard.query.order_by(ProjectStandard.created_at).all()
    project_standard_responses = []
    for project_standard in project_standards:
        project_standard_response = mapper.to(ProjectStandardResponse).map(project_standard)
        project_standard_responses.append(project_standard_response.dict())

    response = jsonify(project_standard_responses)
    return response, 200
