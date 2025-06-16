from flask import abort, jsonify
from flask_jwt_extended import create_access_token, create_refresh_token, set_access_cookies, set_refresh_cookies

from application.utils.bcrypt import bcrypt
from domain.dto.auth.requests.sign_in_request import SignInRequest
from domain.dto.auth.responses.sign_in_response import SignInResponse
from domain.entities.user import User
from domain.enums.api_error_code_enum import ApiErrorCodes


def handle_sign_in(body: SignInRequest):
    email = body.email
    password = body.password

    user = User.query.filter_by(email=email).first()
    if not user:
        abort(401, ApiErrorCodes.INVALID_CREDENTIALS)
    if not bcrypt.check_password_hash(user.password, password):
        abort(401, ApiErrorCodes.INVALID_CREDENTIALS)
    if not user.is_active:
        abort(403, ApiErrorCodes.ACCOUNT_DISABLED)

    access_token = create_access_token(identity=user)
    refresh_token = create_refresh_token(identity=user)

    response = jsonify(SignInResponse(message="Signed in successfully").dict())

    set_access_cookies(response=response, encoded_access_token=access_token)
    set_refresh_cookies(response=response, encoded_refresh_token=refresh_token)

    return response, 200
