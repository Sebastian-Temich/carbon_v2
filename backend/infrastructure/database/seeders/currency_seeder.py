from domain.entities import Currency
from infrastructure.database.db import db


def seed_currencies():
    currencies = [
        Currency(id='00000000-0000-0000-0000-000000000001', code='PLN'),
        Currency(id='00000000-0000-0000-0000-000000000002', code='USD'),
        Currency(id='00000000-0000-0000-0000-000000000003', code='EUR'),
        Currency(id='00000000-0000-0000-0000-000000000004', code='GBP'),
        Currency(id='00000000-0000-0000-0000-000000000005', code='CHF')
    ]
    for currency in currencies:
        db.session.merge(currency)
    db.session.commit()
