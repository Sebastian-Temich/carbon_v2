from flask import jsonify
from flask_jwt_extended import unset_access_cookies, unset_refresh_cookies

from domain.dto.auth.responses.sign_out_response import SignOutResponse


def handle_sign_out():
    response = jsonify(SignOutResponse(message="Successfully signed out").dict())
    unset_access_cookies(response)
    unset_refresh_cookies(response)

    return response, 200
