from flask_jwt_extended import jwt_required
from flask_openapi3 import Tag, APIBlueprint

from application.controllers.auth.refresh_token_handler import handle_refresh_token
from application.controllers.auth.sign_in_handler import handle_sign_in
from application.controllers.auth.sign_out_handler import handle_sign_out
from domain.dto.auth.requests.sign_in_request import SignInRequest
from domain.dto.auth.responses.refresh_token_response import RefreshTokenResponse
from domain.dto.auth.responses.sign_in_response import SignInResponse
from domain.dto.auth.responses.sign_out_response import SignOutResponse

auth_tag = Tag(name='Authentication')
auth_bp = APIBlueprint('Authentication', __name__, url_prefix='/auth', abp_tags=[auth_tag])


@auth_bp.post('/sign-in', responses={'200': SignInResponse})
def sign_in(body: SignInRequest):
    """
    After successful authentication, the JWT token will be set in a cookie.
    Hardcoded users:
    - Admin(email=admin, password=admin)
    - Moderator(email=moderator, password=moderator)
    - Customer(email=customer1, password=customer1)
    - Customer(email=customer2, password=customer2)
    """
    return handle_sign_in(body)


@auth_bp.post('/sign-out', responses={'200': SignOutResponse})
def sign_out():
    """
    After successful sign out, the JWT token will be removed from the cookie.
    """
    return handle_sign_out()


@auth_bp.post('/refresh-token', responses={'200': RefreshTokenResponse})
@jwt_required(refresh=True)
def refresh_token():
    """
    Refreshes access token using refresh token.
    """
    return handle_refresh_token()
