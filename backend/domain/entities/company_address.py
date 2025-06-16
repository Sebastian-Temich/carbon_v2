from sqlalchemy.dialects.postgresql import UUID

from application.config import Config
from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class CompanyAddress(BaseEntity):
    __tablename__ = 'company_addresses'

    street = db.Column(db.Text, nullable=False)
    city = db.Column(db.Text, nullable=False)
    postal_code = db.Column(db.Text, nullable=False)

    company_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f'{Config.DATABASE_SCHEMA}.companies.id', ondelete='CASCADE'),
        nullable=False
    )
    company = db.relationship('Company', back_populates='address')
