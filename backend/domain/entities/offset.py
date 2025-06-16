from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from application.config import Config
from domain.entities import BaseEntity
from infrastructure.database.db import db


class Offset(BaseEntity):
    __tablename__ = 'offsets'

    short_description = db.Column(db.Text, nullable=False)
    unit_count = db.Column(db.Integer, nullable=False)
    unit_creation_year = db.Column(db.Date, nullable=False)
    unit_price = db.Column(db.Numeric(10, 1), nullable=False)
    retirement_date = db.Column(db.DateTime(timezone=True), nullable=True)

    offset_status = db.relationship('OffsetStatus', backref='offsets')
    offset_status_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.offset_statuses.id', ondelete='CASCADE'),
        nullable=False
    )

    currency = db.relationship('Currency', backref='offsets')
    currency_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.currencies.id', ondelete='CASCADE'),
        nullable=False
    )

    unit_type = db.relationship('OffsetUnitType', backref='offsets')
    unit_type_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.offset_unit_types.id', ondelete='CASCADE'),
        nullable=False
    )

    audit_unit = db.relationship('OffsetAuditUnit', backref='offsets')
    audit_unit_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.offset_audit_units.id', ondelete='CASCADE'),
        nullable=False
    )

    project = db.relationship('Project', backref='offsets')
    project_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.projects.id', ondelete='CASCADE'),
        nullable=False
    )

    owned_by_company = db.relationship('Company', backref='offsets')
    owned_by_company_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.companies.id', ondelete='CASCADE'),
        nullable=False
    )

    offset_units = db.relationship('OffsetUnit', back_populates='offset')
