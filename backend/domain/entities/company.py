from domain.entities.base_entity import BaseEntity
from infrastructure.database.db import db


class Company(BaseEntity):
    __tablename__ = 'companies'

    name = db.Column(db.Text, nullable=False)
    NIP = db.Column(db.Text, nullable=False)
    REGON = db.Column(db.Text, nullable=False)
    KRS = db.Column(db.Text, nullable=False)
    representatives = db.Column(db.ARRAY(db.Text), nullable=False)

    address = db.relationship('CompanyAddress', back_populates='company', uselist=False)
    customers = db.relationship('Customer', back_populates='company')
    projects = db.relationship('Project', back_populates='company')
