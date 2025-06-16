from flask_openapi3 import APIBlueprint, Tag

from application.controllers.project_standard.get_project_standards_handler import handle_get_project_standards
from domain.dto.project_standard.responses.project_standard_list_response import ProjectStandardListResponse

project_standards_tag = Tag(name='Project Standards')
project_standards_bp = APIBlueprint('Project Standards', __name__,
                                    url_prefix='/project-standards', abp_tags=[project_standards_tag])


@project_standards_bp.get('', responses={'200': ProjectStandardListResponse})
def get_project_standards():
    """
    Returns all project standards.
    """
    return handle_get_project_standards()
