from uuid import UUID

from automapper import mapper
from flask import jsonify, abort
from flask_jwt_extended import get_current_user

from domain.dto.users.requests.update_user_request import UpdateUserRequest
from domain.dto.users.responses.user_response import UserResponse
from domain.entities.customer import Customer
from domain.entities.moderator import Moderator
from domain.entities.user import User
from domain.enums.role_enum import Roles
from infrastructure.database.db import db


def handle_update_user(user_id: UUID, request: UpdateUserRequest):
    current_user = get_current_user()
    current_user_roles = [role.name for role in current_user.roles]
    user = User.query.get(user_id)
    user_roles = [role.name for role in user.roles]
    update_ourself = current_user.id == user.id
    allowed_to_update = update_ourself or (Roles.ADMIN in current_user_roles)

    if not allowed_to_update:
        abort(403, 'You are not allowed to update this user')

    if 'first_name' in request.__fields_set__:
        user.first_name = request.first_name

    if 'last_name' in request.__fields_set__:
        user.last_name = request.last_name

    if 'email' in request.__fields_set__:
        user.email = request.email

    if Roles.MODERATOR in user_roles:
        update_moderator(user_id, request)

    if Roles.CUSTOMER in user_roles:
        update_customer(user_id, request)

    db.session.commit()

    user_response = mapper.to(UserResponse).map(user)

    response = jsonify(user_response.dict())

    return response, 200


def update_moderator(user_id: UUID, request: UpdateUserRequest):
    moderator = Moderator.query.filter_by(user_id=user_id).first()

    if 'phone' in request.__fields_set__:
        moderator.phone_number = request.phone


def update_customer(user_id: UUID, request: UpdateUserRequest):
    customer = Customer.query.filter_by(user_id=user_id).first()

    if 'phone' in request.__fields_set__:
        customer.phone_number = request.phone

    if 'identity_card_number' in request.__fields_set__:
        customer.identity_card_number = request.identity_card_number
