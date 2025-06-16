from automapper import mapper
from flask import jsonify

from domain.dto.roles.responses.role_response import RoleResponse
from domain.entities.role import Role


def handle_get_roles():
    role_responses = []
    roles = Role.query.order_by(Role.id).all()
    for role in roles:
        role_response = mapper.to(RoleResponse).map(role)
        role_responses.append(role_response.dict())

    response = jsonify(role_responses)
    return response, 200
