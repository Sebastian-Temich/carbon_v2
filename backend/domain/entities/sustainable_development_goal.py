from application.config import Config
from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class SustainableDevelopmentGoal(BaseEntity):
    __tablename__ = 'sustainable_development_goals'

    name = db.Column(db.Text, nullable=False)
    image_uri = db.Column(db.Text, nullable=False)

    projects = db.relationship(
        "Project",
        secondary=f'{Config.DATABASE_SCHEMA}.project_sustainable_development_goals',
        back_populates="sustainable_development_goals"
    )
