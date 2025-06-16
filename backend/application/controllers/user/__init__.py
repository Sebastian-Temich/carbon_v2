from flask_openapi3 import Tag, APIBlueprint

from application.controllers.user.create_moderator_handler import handle_create_moderator
from application.controllers.user.customer_sign_up_handler import handle_customer_sign_up
from application.controllers.user.delete_user_handler import handle_delete_user
from application.controllers.user.get_current_user_handler import handle_get_current_user
from application.controllers.user.get_users_handler import handle_get_users
from application.controllers.user.password_reset_handler import handle_password_reset
from application.controllers.user.update_user_handler import handle_update_user
from application.utils.jwt import authorize, security
from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.customers.requests.customer_sign_up_request import CustomerSignUpRequest
from domain.dto.customers.responses.create_customer_response import CreateCustomerUserResponse
from domain.dto.moderators.responses.create_moderator_response import CreateModeratorResponse
from domain.dto.query_params.user_query import UserQuery
from domain.dto.users.params.delete_user_params import DeleteUserParams
from domain.dto.users.params.update_user_params import UpdateUserParams
from domain.dto.users.requests.create_moderator_request import CreateModeratorRequest
from domain.dto.users.requests.password_reset_request import PasswordResetRequest
from domain.dto.users.requests.update_user_request import UpdateUserRequest
from domain.dto.users.responses.password_reset_response import PasswordResetResponse
from domain.dto.users.responses.user_list_response import UserListResponse
from domain.dto.users.responses.user_response import UserResponse
from domain.enums.role_enum import Roles

users_tag = Tag(name='Users')
users_bp = APIBlueprint('Users', __name__, url_prefix='/users', abp_tags=[users_tag])


@users_bp.get('', responses={'200': UserListResponse})
def get_users(query: UserQuery):
    """
    Returns users with filtering and pagination.
    """
    return handle_get_users(query)


@users_bp.get('current', responses={'200': UserResponse}, security=security)
@authorize()
def get_current_user():
    """
    Returns current user info.
    """
    return handle_get_current_user()


@users_bp.post('/customers/sign-up', responses={'201': CreateCustomerUserResponse})
def customer_sign_up(body: CustomerSignUpRequest):
    """
    Creates a new customer along with his company.
    Credentials are sent to the customer via email.
    Password field in response is for testing purposes only and will be removed in the future.
    """
    return handle_customer_sign_up(body)


@users_bp.post('/password-reset', responses={'200': PasswordResetResponse})
def password_reset(body: PasswordResetRequest):
    """
    Sends an email with new password to the user.
    """
    return handle_password_reset(body)


@users_bp.post('/moderators', responses={'201': CreateModeratorResponse}, security=security)
@authorize(roles=[Roles.ADMIN])
def create_moderator(body: CreateModeratorRequest):
    """
    Creates new moderator.
    Credentials are sent via email.
    """
    return handle_create_moderator(body)


@users_bp.patch('/<uuid:userId>', responses={'200': UserResponse}, security=security)
@authorize()
def update_user(path: UpdateUserParams, body: UpdateUserRequest):
    """
    Updates user.
    """
    return handle_update_user(path.user_id, body)


@users_bp.delete('/<uuid:userId>', responses={'200': BasePydanticModel}, security=security)
@authorize(roles=[Roles.ADMIN])
def delete_user(path: DeleteUserParams):
    """
    Deletes user.
    """
    return handle_delete_user(path.user_id)
