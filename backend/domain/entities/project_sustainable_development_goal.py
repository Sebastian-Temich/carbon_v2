from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from application.config import Config
from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class ProjectSustainableDevelopmentGoal(BaseEntity):
    __tablename__ = 'project_sustainable_development_goals'

    project_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.projects.id', ondelete='CASCADE'),
        nullable=False
    )
    sustainable_development_goal_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.sustainable_development_goals.id', ondelete='CASCADE'),
        nullable=False
    )
