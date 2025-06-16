from domain.entities import BaseEntity
from infrastructure.database.db import db


class OffsetAuditUnit(BaseEntity):
    __tablename__ = 'offset_audit_units'

    name = db.Column(db.Text, nullable=False, unique=True)
