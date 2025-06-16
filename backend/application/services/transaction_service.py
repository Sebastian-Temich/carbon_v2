from automapper import mapper

from application.services.offset_service import OffsetService
from domain.dto.transaction.responses.transaction_response import TransactionResponse
from domain.entities import Transaction


class TransactionService:
    @staticmethod
    def get_transaction_response(transaction: Transaction) -> TransactionResponse:
        transaction_response = mapper.to(TransactionResponse).map(transaction)
        transaction_response.offset = OffsetService.get_offset_response(transaction.offset)
        return transaction_response
