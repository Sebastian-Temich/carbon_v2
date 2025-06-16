from uuid import UUID

from flask import abort, jsonify

from application.services.offset_log_service import OffsetLogService
from application.services.offset_service import OffsetService
from application.services.transaction_service import TransactionService
from blockchain.smart_contract_service import change_tokens_owner_on_blockchain
from domain.dto.transaction.requests.update_transaction_request import UpdateTransactionRequest
from domain.entities import Transaction, TransactionStatus, OffsetStatus, Offset
from domain.enums.offset_log_actions import OffsetLogActions
from domain.enums.offset_status_enum import OffsetStatuses
from domain.enums.transaction_status_enum import TransactionStatuses
from infrastructure.database.db import db


def handle_update_transaction(transaction_id: UUID, body: UpdateTransactionRequest):
    transaction = Transaction.query.get(transaction_id)
    if not transaction:
        abort(404, 'Transaction not found')

    if transaction.transaction_status.name != TransactionStatuses.PENDING:
        abort(400, 'Transaction status is not PENDING')

    transaction_status = TransactionStatus.query.get(body.transaction_status_id)
    if not transaction_status:
        abort(404, 'Transaction status not found')

    if transaction_status.name == TransactionStatuses.REJECTED:
        reject_transaction(transaction)
    elif transaction_status.name == TransactionStatuses.ACCEPTED:
        accept_transaction(transaction)
    else:
        abort(400, 'New transaction status can only be ACCEPTED or REJECTED')

    db.session.commit()
    transaction_response = TransactionService.get_transaction_response(transaction)
    response = jsonify(transaction_response.dict())
    return response, 200


def reject_transaction(transaction: Transaction) -> None:
    transaction.transaction_status = TransactionStatus.query.filter_by(name=TransactionStatuses.REJECTED).first()
    offset = Offset.query.get(transaction.offset_id)
    if OffsetService.is_offset_from_original_owner(offset.id):
        offset.offset_status = OffsetStatus.query.filter_by(name=OffsetStatuses.ACCEPTED).first()
    else:
        offset.offset_status = OffsetStatus.query.filter_by(name=OffsetStatuses.MARKETPLACE).first()


def accept_transaction(transaction: Transaction) -> None:
    transaction.transaction_status = TransactionStatus.query.filter_by(name=TransactionStatuses.ACCEPTED).first()
    bought_offset = create_bought_offset(transaction=transaction, user_company_id=transaction.company_id)
    db.session.add(bought_offset)
    offset = Offset.query.get(transaction.offset_id)
    offset.unit_count -= transaction.unit_count
    offset_units_ids = OffsetService.transfer_offset_units(
        from_offset=offset.id,
        to_offset=bought_offset.id,
        count=transaction.unit_count
    )
    create_offset_logs(source_offset=offset, target_offset=bought_offset, buyer_company_id=transaction.company_id)
    new_owner_id = f'company_{bought_offset.owned_by_company_id}'
    transfer_offset_units_on_blockchain(offset_units_ids, new_owner_id)


def create_bought_offset(transaction: Transaction, user_company_id: UUID) -> Offset:
    bought_offset = OffsetService.clone_offset(transaction.offset_id)
    bought_offset.unit_count = transaction.unit_count
    bought_offset.offset_status = OffsetStatus.query.filter_by(name=OffsetStatuses.NOT_LISTED).first()
    bought_offset.owned_by_company_id = user_company_id
    return bought_offset


def create_offset_logs(source_offset: Offset, target_offset: Offset, buyer_company_id: UUID) -> None:
    OffsetLogService.add_offset_log(
        source_offset_id=source_offset.id,
        target_offset_id=target_offset.id,
        company_id=source_offset.owned_by_company_id,
        action=OffsetLogActions.SELL,
        commit=False
    )
    OffsetLogService.add_offset_log(
        source_offset_id=source_offset.id,
        target_offset_id=target_offset.id,
        company_id=buyer_company_id,
        action=OffsetLogActions.BUY,
        commit=False
    )
    db.session.commit()


def transfer_offset_units_on_blockchain(offset_units_ids, new_owner_id):
    offset_units_ids_str = [str(offset_unit_id) for offset_unit_id in offset_units_ids]
    change_tokens_owner_on_blockchain(offset_units_ids_str, new_owner_id)
