from flask import abort, jsonify
from flask_jwt_extended import get_jwt_identity, create_access_token, create_refresh_token, set_access_cookies, \
    set_refresh_cookies

from domain.dto.auth.responses.refresh_token_response import RefreshTokenResponse
from domain.entities.user import User
from domain.enums.api_error_code_enum import ApiErrorCodes


def handle_refresh_token():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if not user:
        abort(404, "User doesn't exist")
    if not user.is_active:
        abort(403, ApiErrorCodes.ACCOUNT_DISABLED)

    access_token = create_access_token(identity=user)
    refresh_token = create_refresh_token(identity=user)
    response = jsonify(RefreshTokenResponse(message="Token refreshed successfully").dict())

    set_access_cookies(response=response, encoded_access_token=access_token)
    set_refresh_cookies(response=response, encoded_refresh_token=refresh_token)

    return response, 200
