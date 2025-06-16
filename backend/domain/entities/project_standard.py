from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class ProjectStandard(BaseEntity):
    __tablename__ = 'project_standards'

    name = db.Column(db.Text, nullable=False, unique=True)
