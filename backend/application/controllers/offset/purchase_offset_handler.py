import uuid
from uuid import UUID

from flask import abort, jsonify, Response
from flask_jwt_extended import get_current_user

from application.services.offset_service import OffsetService
from domain.dto.offsets.requests.buy_offset_request import BuyOffsetRequest
from domain.entities import Offset, User, Transaction, TransactionStatus, OffsetStatus
from domain.enums.api_error_code_enum import ApiErrorCodes
from domain.enums.offset_status_enum import OffsetStatuses
from domain.enums.transaction_status_enum import TransactionStatuses
from infrastructure.database.db import db


def handle_purchase_offset(offset_id: UUID, request: BuyOffsetRequest) -> tuple[Response, int]:
    offset: Offset = Offset.query.get(offset_id)
    if not offset:
        abort(404, 'Offset not found')

    current_user: User = get_current_user()
    user_company_id = current_user.customer.company_id

    validate_purchase_request(offset=offset, request=request, user_company_id=user_company_id)

    update_offset(offset=offset, request=request)
    transaction = create_transaction(offset=offset, request=request, company_id=user_company_id)
    db.session.add(transaction)
    db.session.commit()

    response = jsonify()
    return response, 200


def update_offset(offset: Offset, request: BuyOffsetRequest) -> None:
    offset_pending_unit_count = OffsetService.get_offset_pending_transactions_unit_count(offset.id)
    if offset.unit_count - offset_pending_unit_count == request.unit_count:
        offset.offset_status = OffsetStatus.query.filter_by(name=OffsetStatuses.SOLD_OUT).first()


def create_transaction(offset: Offset, request: BuyOffsetRequest, company_id: UUID) -> Transaction:
    transaction = Transaction(
        id=uuid.uuid4(),
        unit_count=request.unit_count,
        unit_price=offset.unit_price,
        offset_id=offset.id,
        company_id=company_id,
        transaction_status=TransactionStatus.query.filter_by(name=TransactionStatuses.PENDING).first()
    )
    return transaction


def validate_purchase_request(offset: Offset, request: BuyOffsetRequest, user_company_id: UUID) -> None:
    if offset.offset_status.name not in [OffsetStatuses.MARKETPLACE, OffsetStatuses.ACCEPTED]:
        abort(400, 'Offset is not available for purchase')

    offset_pending_transactions_unit_count = OffsetService.get_offset_pending_transactions_unit_count(offset.id)
    if (offset.unit_count - offset_pending_transactions_unit_count) < request.unit_count:
        abort(400, ApiErrorCodes.NOT_ENOUGH_UNITS_AVAILABLE)

    if user_company_id == offset.owned_by_company_id:
        abort(400, 'Cannot buy your own offset')
