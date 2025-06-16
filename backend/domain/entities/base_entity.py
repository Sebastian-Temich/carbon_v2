import uuid

from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.sql import func

from application.config import Config
from infrastructure.database.db import db


class BaseEntity(db.Model):
    __abstract__ = True
    __table_args__ = {"schema": Config.DATABASE_SCHEMA}

    id = db.Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)

    created_at = db.Column(
        db.DateTime(timezone=True),
        default=func.now(),
        nullable=False
    )

    updated_at = db.Column(
        db.DateTime(timezone=True),
        default=func.now(),
        onupdate=func.current_timestamp(),
        nullable=False
    )
