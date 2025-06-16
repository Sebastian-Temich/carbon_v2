from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from application.config import Config
from domain.entities.base_entity import BaseEntity


class UserRole(BaseEntity):
    __tablename__ = 'user_roles'

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.users.id', ondelete='CASCADE'),
        nullable=False
    )

    role_id = Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.roles.id', ondelete='CASCADE'),
        nullable=False
    )
