from sqlalchemy.dialects.postgresql import UUID

from application.config import Config
from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class Customer(BaseEntity):
    __tablename__ = 'customers'

    phone_number = db.Column(db.Text, nullable=False)
    identity_card_number = db.Column(db.Text, nullable=False)

    user_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f'{Config.DATABASE_SCHEMA}.users.id', ondelete='CASCADE'),
        nullable=False
    )
    user = db.relationship('User', back_populates='customer')

    company_id = db.Column(
        UUID(as_uuid=True),
        db.ForeignKey(f'{Config.DATABASE_SCHEMA}.companies.id', ondelete='CASCADE'),
        nullable=False
    )
    company = db.relationship('Company', back_populates='customers')
