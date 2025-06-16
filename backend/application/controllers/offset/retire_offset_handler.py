from datetime import datetime
from uuid import UUID

from flask import abort, jsonify
from flask_jwt_extended import get_current_user

from application.services.offset_log_service import OffsetLogService
from application.services.offset_service import OffsetService
from blockchain.smart_contract_service import retire_tokens_on_blockchain
from domain.dto.offsets.requests.retire_offset_units_request import RetireOffsetUnitsRequest
from domain.entities import Offset, Project, OffsetUnit, OffsetStatus
from domain.enums.api_error_code_enum import ApiErrorCodes
from domain.enums.offset_log_actions import OffsetLogActions
from domain.enums.offset_status_enum import OffsetStatuses
from infrastructure.database.db import db


def handle_retire_offset(offset_id: UUID, request: RetireOffsetUnitsRequest):
    offset = Offset.query.get(offset_id)
    if not offset:
        abort(404, 'Offset not found')

    current_user = get_current_user()
    company_id = current_user.customer.company_id

    validate_retire_request(offset=offset, request=request, user_company_id=company_id)

    retiring_all_units = request.unit_count == offset.unit_count
    if retiring_all_units:
        retired_offset = offset
    else:
        retired_offset = OffsetService.clone_offset(offset_id)
        update_current_offset(offset=offset, request=request)
        OffsetService.transfer_offset_units(offset_id, retired_offset.id, request.unit_count)

    update_retired_offset(retired_offset=retired_offset, request=request)
    db.session.add(retired_offset)
    db.session.commit()

    OffsetLogService.add_offset_log(
        source_offset_id=offset.id,
        target_offset_id=retired_offset.id,
        company_id=company_id,
        action=OffsetLogActions.RETIRE,
    )

    retire_units_on_blockchain(retired_offset=retired_offset)

    retired_offset_response = OffsetService.get_offset_response(retired_offset)
    response = jsonify(retired_offset_response.dict())
    return response, 200


def update_current_offset(offset: Offset, request: RetireOffsetUnitsRequest) -> None:
    offset.unit_count -= request.unit_count


def update_retired_offset(retired_offset: Offset, request: RetireOffsetUnitsRequest) -> None:
    retired_offset.unit_count = request.unit_count
    retired_offset.retirement_date = datetime.now()
    retired_offset.offset_status = OffsetStatus.query.filter_by(name=OffsetStatuses.RETIRED).first()


def retire_units_on_blockchain(retired_offset: Offset):
    print('\U0001F6A8 Retiring offset units')
    offset_unit_ids = [unit.id for unit in OffsetUnit.query.filter_by(offset_id=retired_offset.id)]
    offset_units_count = len(offset_unit_ids)
    if offset_units_count > 0:
        offset_unit_ids_as_string_list = [str(unit_id) for unit_id in offset_unit_ids]
        print('\U0001F6A8 List of offset units ids', offset_unit_ids_as_string_list)
        result = retire_tokens_on_blockchain(carbon_credit_tokens_ids=offset_unit_ids_as_string_list)
        if result:
            print('\U0001F6A8 Offset units retired on blockchain')
        else:
            print('\U0001F6A8 Problem while retiring offset units on blockchain')


def validate_retire_request(offset: Offset, request: RetireOffsetUnitsRequest, user_company_id: UUID) -> None:
    offset_unit_count = len(offset.offset_units)
    if offset_unit_count < request.unit_count:
        abort(400, ApiErrorCodes.NOT_ENOUGH_UNITS_AVAILABLE)

    if user_company_id != offset.owned_by_company_id:
        abort(403, 'Cannot retire units from offset that is not owned by your company')

    if user_company_id == Project.query.get(offset.project_id).company_id:
        abort(400, 'Cannot retire units created by your own company')

    if offset.offset_status.name in [OffsetStatuses.RETIRED]:
        abort(400, 'Cannot retire units from offset that is already retired')

    # if offset.offset_status.name not in [OffsetStatuses.NOT_LISTED]:
    #     abort(400, 'You can only retire units from an offset that is NOT_LISTED')
