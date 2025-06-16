from sqlalchemy import ForeignKey
from sqlalchemy.dialects.postgresql import UUID

from application import Config
from domain.entities import BaseEntity
from infrastructure.database.db import db


class Transaction(BaseEntity):
    __tablename__ = 'transactions'

    unit_count = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Numeric(10, 1), nullable=False)

    transaction_status = db.relationship('TransactionStatus')
    transaction_status_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.transaction_statuses.id', ondelete='CASCADE'),
        nullable=False
    )

    offset = db.relationship('Offset')
    offset_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.offsets.id', ondelete='CASCADE'),
        nullable=False
    )

    company = db.relationship('Company')
    company_id = db.Column(
        UUID(as_uuid=True),
        ForeignKey(f'{Config.DATABASE_SCHEMA}.companies.id', ondelete='CASCADE'),
        nullable=False
    )
