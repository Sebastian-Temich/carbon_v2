from sqlalchemy.dialects.postgresql import UUID

from application.config import Config
from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class Moderator(BaseEntity):
    __tablename__ = 'moderators'

    phone_number = db.Column(db.Text, nullable=False)

    user_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f'{Config.DATABASE_SCHEMA}.users.id', ondelete='CASCADE'),
        nullable=False
    )
    user = db.relationship('User', back_populates='moderator')
