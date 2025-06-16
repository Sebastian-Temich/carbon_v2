from flask_openapi3 import Tag, APIBlueprint

from application.controllers.role.get_roles_handler import handle_get_roles
from domain.dto.roles.responses.role_list_response import RoleListResponse

roles_tag = Tag(name='Roles')
roles_bp = APIBlueprint('Roles', __name__, url_prefix='/roles', abp_tags=[roles_tag])


@roles_bp.get('', responses={'200': RoleListResponse})
def get_roles():
    """
    Returns all roles.
    """
    return handle_get_roles()
