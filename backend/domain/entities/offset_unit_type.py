from domain.entities import BaseEntity
from infrastructure.database.db import db


class OffsetUnitType(BaseEntity):
    __tablename__ = 'offset_unit_types'

    name = db.Column(db.Text, nullable=False, unique=True)
