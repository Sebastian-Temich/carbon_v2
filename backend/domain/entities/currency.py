from domain.entities import BaseEntity
from infrastructure.database.db import db


class Currency(BaseEntity):
    __tablename__ = 'currencies'

    code = db.Column(db.String(3), nullable=False, unique=True)
