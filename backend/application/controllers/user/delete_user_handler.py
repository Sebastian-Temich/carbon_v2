from uuid import UUID

from flask import jsonify

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.entities.user import User
from infrastructure.database.db import db


def handle_delete_user(user_id: UUID):
    User.query.filter_by(id=user_id).delete()

    db.session.commit()

    return jsonify(BasePydanticModel().dict()), 200
