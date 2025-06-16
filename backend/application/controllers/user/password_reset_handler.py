from flask import abort, jsonify

from application import bcrypt, Config
from application.utils.password_generator import password_generator
from application.utils.sendgrid import sendgrid
from domain.dto.emails.password_reset_email_data import PasswordResetEmailData
from domain.dto.users.requests.password_reset_request import PasswordResetRequest
from domain.dto.users.responses.password_reset_response import PasswordResetResponse
from domain.entities import User
from domain.enums.api_error_code_enum import ApiErrorCodes
from infrastructure.database.db import db
from send_grid.dto.single_email_dto import SingleEmailDto


def handle_password_reset(body: PasswordResetRequest):
    email = body.email
    user = User.query.filter_by(email=email).first()
    if not user:
        abort(404, ApiErrorCodes.EMAIL_NOT_FOUND)

    password = password_generator.generate()
    password_hash = bcrypt.generate_password_hash(password).decode("utf-8")
    user.password = password_hash

    password_reset_response = PasswordResetResponse(new_password=password)
    response = jsonify(password_reset_response.dict())

    send_password_reset_email(user, password)
    db.session.commit()

    return response, 200


def send_password_reset_email(user: User, password: str):
    template_data = PasswordResetEmailData(new_password=password)
    email_data = SingleEmailDto(
        recipient_email=user.email,
        recipient_name=f"{user.first_name} {user.last_name}",
        template_id=Config.SENDGRID_TEMPLATE_FORGOT_PASSWORD,
        template_data=template_data.dict()
    )
    sendgrid.send_email(email_data)
