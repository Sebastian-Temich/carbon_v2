from uuid import UUID

from flask import abort, jsonify, Response
from flask_jwt_extended import get_current_user

from application.services.offset_service import OffsetService
from domain.dto.offsets.requests.sell_offset_request import SellOffsetRequest
from domain.entities import Offset, OffsetStatus, OffsetUnit
from domain.enums.api_error_code_enum import ApiErrorCodes
from domain.enums.offset_status_enum import OffsetStatuses
from infrastructure.database.db import db


def handle_sell_offset(offset_id: UUID, request: SellOffsetRequest) -> tuple[Response, int]:
    offset = Offset.query.get(offset_id)
    if not offset:
        abort(404, 'Offset not found')

    current_user = get_current_user()
    company_id = current_user.customer.company_id

    validate_sell_request(offset=offset, request=request, user_company_id=company_id)

    selling_all_units = request.unit_count == offset.unit_count
    if selling_all_units:
        sold_offset = offset
    else:
        sold_offset = OffsetService.clone_offset(offset_id)
        update_current_offset(offset=offset, request=request)
        OffsetService.transfer_offset_units(offset_id, sold_offset.id, request.unit_count)

    update_new_offset_offer(offset=sold_offset, request=request)
    db.session.add(sold_offset)
    db.session.commit()

    offset_response = OffsetService.get_offset_response(sold_offset)
    response = jsonify(offset_response.dict())
    return response, 201


def update_current_offset(offset: Offset, request: SellOffsetRequest) -> None:
    offset.unit_count -= request.unit_count


def update_new_offset_offer(offset: Offset, request: SellOffsetRequest) -> None:
    offset.offset_status = OffsetStatus.query.filter_by(name=OffsetStatuses.MARKETPLACE).first()
    offset.unit_count = request.unit_count
    offset.unit_price = request.unit_price


def validate_sell_request(offset: Offset, request: SellOffsetRequest, user_company_id: UUID) -> None:
    if user_company_id != offset.owned_by_company_id:
        abort(403, 'Cannot sell an offset you do not own')

    if offset.offset_status.name not in [OffsetStatuses.NOT_LISTED]:
        abort(400, 'Cannot sell an offset that is currently listed')

    offset_units_count = OffsetUnit.query.filter_by(offset_id=offset.id).count()

    if request.unit_count > offset_units_count:
        abort(400, ApiErrorCodes.NOT_ENOUGH_UNITS_AVAILABLE)
