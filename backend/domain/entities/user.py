from application.config import Config
from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class User(BaseEntity):
    __tablename__ = 'users'

    email = db.Column(db.Text, nullable=False, unique=True)
    password = db.Column(db.String(60), nullable=False)
    first_name = db.Column(db.Text, nullable=False)
    last_name = db.Column(db.Text, nullable=False)
    is_active = db.Column(db.Boolean, nullable=False, default=False)

    roles = db.relationship("Role", secondary=f'{Config.DATABASE_SCHEMA}.user_roles', back_populates="users")
    customer = db.relationship('Customer', back_populates='user', uselist=False)
    moderator = db.relationship('Moderator', back_populates='user', uselist=False)
