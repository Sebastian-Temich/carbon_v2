from flask import jsonify

from domain.dto.transaction_status.responses.transaction_status_response import TransactionStatusResponse
from domain.entities import TransactionStatus


def handle_get_transaction_statuses():
    transaction_statuses = TransactionStatus.query.order_by(TransactionStatus.id).all()
    transaction_status_responses = [
        TransactionStatusResponse.from_orm(transaction_status).dict()
        for transaction_status in transaction_statuses
    ]

    response = jsonify(transaction_status_responses)
    return response, 200
