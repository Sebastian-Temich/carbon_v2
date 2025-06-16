from domain.entities import TransactionStatus
from domain.enums.transaction_status_enum import TransactionStatuses
from infrastructure.database.db import db


def seed_transaction_statuses():
    transaction_statuses = [
        TransactionStatus(id='00000000-0000-0000-0000-000000000001', name=TransactionStatuses.PENDING),
        TransactionStatus(id='00000000-0000-0000-0000-000000000002', name=TransactionStatuses.ACCEPTED),
        TransactionStatus(id='00000000-0000-0000-0000-000000000003', name=TransactionStatuses.REJECTED),
    ]

    for transaction_status in transaction_statuses:
        db.session.merge(transaction_status)

    db.session.commit()
