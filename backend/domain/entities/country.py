from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class Country(BaseEntity):
    __tablename__ = 'countries'

    alpha3_code = db.Column(db.String(3), nullable=False, unique=True)
    name = db.Column(db.Text, nullable=False, unique=True)
