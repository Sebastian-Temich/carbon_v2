from sqlalchemy.dialects.postgresql import UUID

from application.config import Config
from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class Project(BaseEntity):
    __tablename__ = 'projects'

    name = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    address = db.Column(db.Text, nullable=False)
    start_date = db.Column(db.DateTime(timezone=True), nullable=False)
    expected_end_date = db.Column(db.DateTime(timezone=True), nullable=False)
    unit_generation_start_date = db.Column(db.DateTime(timezone=True), nullable=False)
    unit_generation_end_date = db.Column(db.DateTime(timezone=True), nullable=False)
    circularity = db.Column(db.Text, nullable=False)
    image_uri = db.Column(db.Text, nullable=True)
    image_blurhash = db.Column(db.Text, nullable=True)
    image_aspect_ratio = db.Column(db.Float, nullable=True)

    country = db.relationship('Country')
    country_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f"{Config.DATABASE_SCHEMA}.countries.id", ondelete='CASCADE'),
        nullable=False
    )

    project_standard = db.relationship('ProjectStandard')
    project_standard_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f"{Config.DATABASE_SCHEMA}.project_standards.id", ondelete='CASCADE'),
        nullable=False
    )

    company = db.relationship('Company', back_populates='projects', uselist=False)
    company_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f"{Config.DATABASE_SCHEMA}.companies.id", ondelete='CASCADE'),
        nullable=False
    )

    sustainable_development_goals = db.relationship(
        "SustainableDevelopmentGoal",
        secondary=f'{Config.DATABASE_SCHEMA}.project_sustainable_development_goals',
        back_populates="projects"
    )
