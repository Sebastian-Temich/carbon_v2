from sqlalchemy.dialects.postgresql import UUID

from application.config import Config
from domain.entities import BaseEntity
from infrastructure.database.db import db


class OffsetUnit(BaseEntity):
    __tablename__ = 'offset_units'

    offset = db.relationship('Offset', back_populates='offset_units', uselist=False)
    offset_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f"{Config.DATABASE_SCHEMA}.offsets.id", ondelete='CASCADE'),
        nullable=False
    )
