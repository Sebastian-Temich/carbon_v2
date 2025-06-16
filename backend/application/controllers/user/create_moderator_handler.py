from uuid import UUID

from flask import jsonify

from application.services.user_service import create_user, send_account_created_email
from application.utils.password_generator import password_generator
from domain.dto.moderators.responses.create_moderator_response import CreateModeratorResponse
from domain.dto.users.create_user_data import CreateUserData
from domain.dto.users.requests.create_moderator_request import CreateModeratorRequest
from domain.entities.moderator import Moderator
from domain.entities.role import Role
from domain.entities.user_role import UserRole
from domain.enums.role_enum import Roles
from infrastructure.database.db import db


def handle_create_moderator(request: CreateModeratorRequest):
    password = password_generator.generate()
    user = create_user(CreateUserData(
        first_name=request.first_name,
        last_name=request.last_name,
        email=request.email,
        password=password
    ))
    db.session.add(user)

    user_role = UserRole(user_id=user.id, role_id=Role.query.filter_by(name=Roles.MODERATOR).first().id)
    db.session.add(user_role)

    moderator = create_moderator(user.id, request.phone)
    db.session.add(moderator)

    db.session.commit()
    send_account_created_email(user, password)

    # password for debug needs
    response = jsonify(CreateModeratorResponse(password=password).dict())

    return response, 201


def create_moderator(user_id: UUID, phone_number: str):
    moderator = Moderator(
        phone_number=phone_number,
        user_id=user_id,
    )
    return moderator
