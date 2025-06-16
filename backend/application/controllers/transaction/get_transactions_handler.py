from flask import jsonify

from application.services.transaction_service import TransactionService
from application.utils.pagination import set_pagination_metadata
from domain.dto.query_params.transaction_query import TransactionQuery
from domain.entities import Transaction


def handle_get_transactions(query: TransactionQuery):
    transactions = query_transactions(query)
    transactions = transactions.paginate(page=query.page, per_page=query.per_page)
    transaction_responses = [TransactionService.get_transaction_response(transaction).dict()
                             for transaction in transactions.items]

    response = jsonify(transaction_responses)
    set_pagination_metadata(response=response, pagination=transactions)
    return response, 200


def query_transactions(query: TransactionQuery):
    transactions = Transaction.query.order_by(Transaction.created_at.desc())

    if query.transaction_status_ids:
        transactions = transactions.filter(Transaction.transaction_status_id.in_(query.transaction_status_ids))

    return transactions
