from flask_openapi3 import Tag, APIBlueprint

from application.controllers.transaction_status.get_transaction_statuses_handler import handle_get_transaction_statuses
from domain.dto.transaction_status.responses.transaction_status_list_response import TransactionStatusListResponse

transaction_statuses_tag = Tag(name='Transaction statuses')
transaction_statuses_bp = APIBlueprint('Transaction statuses', __name__,
                                       url_prefix='/transaction-statuses', abp_tags=[transaction_statuses_tag])


@transaction_statuses_bp.get('', responses={'200': TransactionStatusListResponse})
def get_transaction_statuses():
    """
    Returns all transaction statuses.
    """
    return handle_get_transaction_statuses()
