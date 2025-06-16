from domain.entities import BaseEntity
from infrastructure.database.db import db


class TransactionStatus(BaseEntity):
    __tablename__ = 'transaction_statuses'

    name = db.Column(db.Text, unique=True, nullable=False)
