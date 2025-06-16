from domain.entities import BaseEntity
from infrastructure.database.db import db


class OffsetStatus(BaseEntity):
    __tablename__ = 'offset_statuses'

    name = db.Column(db.Text, nullable=False, unique=True)
