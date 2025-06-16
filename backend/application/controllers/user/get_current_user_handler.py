from automapper import mapper
from flask import jsonify
from flask_jwt_extended import get_current_user

from domain.dto.users.responses.user_response import UserResponse


def handle_get_current_user():
    current_user = get_current_user()
    user_response = mapper.to(UserResponse).map(current_user)
    response = jsonify(user_response.dict())
    return response, 200
