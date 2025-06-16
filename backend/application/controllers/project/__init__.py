from flask_openapi3 import APIBlueprint, Tag

from application.controllers.project.create_project_handler import handle_create_project
from application.controllers.project.get_project_handler import handle_get_project
from application.controllers.project.get_projects_handler import handle_get_projects
from application.controllers.project.update_project_handler import handle_update_project
from application.utils.jwt import authorize, security
from domain.dto.projects.path_params.get_project_path_params import GetProjectPathParams
from domain.dto.projects.requests.create_project_request import CreateProjectRequest
from domain.dto.projects.requests.update_project_request import UpdateProjectRequest
from domain.dto.projects.responses.project_list_response import ProjectListResponse
from domain.dto.projects.responses.project_response import ProjectResponse
from domain.dto.query_params.project_query import ProjectQuery
from domain.enums.role_enum import Roles

projects_tag = Tag(name='Projects')
projects_bp = APIBlueprint('Projects', __name__, url_prefix='/projects', abp_tags=[projects_tag])


@projects_bp.get('', responses={'200': ProjectListResponse}, security=security)
@authorize()
def get_projects(query: ProjectQuery):
    """
    Returns all projects with filtering and pagination.
    SDG, UnitType & AuditUnit filtering is 'AND' logic.
    UnitType and AuditUnit filtering is based on the project's offsets.
    """
    return handle_get_projects(query)


@projects_bp.get('/<uuid:projectId>', responses={'200': ProjectResponse}, security=security)
@authorize()
def get_project(path: GetProjectPathParams):
    """
    Returns a single project.
    """
    return handle_get_project(path.project_id)


@projects_bp.post('', responses={'201': ProjectResponse}, security=security)
@authorize(roles=[Roles.CUSTOMER])
def create_project(body: CreateProjectRequest):
    """
    Creates a new project.
    As for now the project image is optional.
    Max image size is 5MB.
    Accepted image formats are: png, jpg, jpeg.
    """
    return handle_create_project(body)


@projects_bp.patch('/<uuid:projectId>', responses={'200': ProjectResponse}, security=security)
@authorize([Roles.CUSTOMER, Roles.MODERATOR])
def update_project(path: GetProjectPathParams, body: UpdateProjectRequest):
    """
    Updates a single project.
    Every field present in the request body will be updated.
    Fields not present in the request body will be left unchanged.
    Max image size is 5MB. Accepted image formats are: png, jpg, jpeg.
    All offsets related to this project which are not already sold and their status is ACCEPTED will be PENDING.
    """
    return handle_update_project(path.project_id, body)
