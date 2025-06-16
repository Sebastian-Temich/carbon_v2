from sqlalchemy.dialects.postgresql import UUID

from application import Config
from domain.entities import BaseEntity
from infrastructure.database.db import db


class OffsetLog(BaseEntity):
    __tablename__ = 'offset_logs'

    unit_price = db.Column(db.Numeric(10, 1), nullable=False)
    unit_count = db.Column(db.Integer, nullable=False)
    action = db.Column(db.Text, nullable=False)

    source_offset_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f'{Config.DATABASE_SCHEMA}.offsets.id', ondelete='CASCADE'),
        nullable=False
    )
    source_offset = db.relationship('Offset', foreign_keys=[source_offset_id])

    target_offset_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f'{Config.DATABASE_SCHEMA}.offsets.id', ondelete='CASCADE'),
        nullable=False
    )
    target_offset = db.relationship('Offset', foreign_keys=[target_offset_id])

    company_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f'{Config.DATABASE_SCHEMA}.companies.id', ondelete='CASCADE'),
        nullable=False
    )
    company = db.relationship('Company')
