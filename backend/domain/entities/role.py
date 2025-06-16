from application.config import Config
from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class Role(BaseEntity):
    __tablename__ = 'roles'

    name = db.Column(db.Text, unique=True, nullable=False)

    users = db.relationship("User", secondary=f'{Config.DATABASE_SCHEMA}.user_roles', back_populates="roles")
