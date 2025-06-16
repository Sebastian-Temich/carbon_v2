from flask_openapi3 import Tag, APIBlueprint

from application.controllers.transaction.get_transactions_handler import handle_get_transactions
from application.controllers.transaction.update_transaction_handler import handle_update_transaction
from application.utils.jwt import security
from domain.dto.query_params.transaction_query import TransactionQuery
from domain.dto.transaction.path_params.get_transaction_path_params import GetTransactionPathParams
from domain.dto.transaction.requests.update_transaction_request import UpdateTransactionRequest
from domain.dto.transaction.responses.transaction_list_response import TransactionListResponse
from domain.dto.transaction.responses.transaction_response import TransactionResponse

transactions_tag = Tag(name='Transactions')
transactions_bp = APIBlueprint('Transactions', __name__, url_prefix='/transactions', abp_tags=[transactions_tag])


@transactions_bp.get('', responses={'200': TransactionListResponse}, security=security)
def get_transactions(query: TransactionQuery):
    """
    Returns all transactions
    """
    return handle_get_transactions(query)


@transactions_bp.patch('/<uuid:transactionId>', responses={'200': TransactionResponse}, security=security)
def update_transaction(path: GetTransactionPathParams, body: UpdateTransactionRequest):
    """
    Updates a transaction.
    Status can only be changed once from 'Pending' to 'Approved' or 'Rejected'.
    """
    return handle_update_transaction(path.transaction_id, body)
