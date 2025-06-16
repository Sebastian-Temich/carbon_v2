import uuid
from uuid import UUID

from flask import abort, jsonify, Response
from flask_jwt_extended import get_current_user

from application.services.offset_service import OffsetService
from blockchain.smart_contract_service import create_tokens_on_blockchain
from domain.dto.offsets.requests.update_offset_request import UpdateOffsetRequest
from domain.entities import Project, Offset, Currency, OffsetStatus, User, OffsetUnit
from domain.enums.api_error_code_enum import ApiErrorCodes
from domain.enums.offset_status_enum import OffsetStatuses
from domain.enums.role_enum import Roles
from infrastructure.database.db import db


def handle_update_offset(offset_id: UUID, body: UpdateOffsetRequest) -> tuple[Response, int]:
    if not body.__fields_set__:
        abort(400, 'No fields to update')

    offset = Offset.query.filter_by(id=offset_id).first()
    if not offset:
        abort(404, 'Offset with given id does not exist')

    current_user = get_current_user()
    user_roles = [role.name for role in current_user.roles]
    is_moderator = Roles.MODERATOR in user_roles

    if offset.unit_count == 0:
        abort(403, ApiErrorCodes.CANNOT_UPDATE_SOLD_OUT_OFFSET)

    if is_moderator:
        update_fields_by_moderator(offset, body)
    elif is_user_creator_and_current_holder(user_roles, offset, current_user):
        update_fields_by_creator(offset, body)
        set_status_based_on_creator_action(offset, body)
    elif is_user_current_holder_but_not_creator(user_roles, offset, current_user):
        update_fields_by_current_holder_but_not_creator(offset, body)
    else:
        abort(403, 'You are not allowed to update this offset')

    offset_response = OffsetService.get_offset_response(offset)
    response = jsonify(offset_response.dict())
    db.session.commit()

    if should_create_offset_units(offset, is_moderator):
        create_offset_units(offset)

    return response, 200


def update_fields_by_current_holder_but_not_creator(offset: Offset, body: UpdateOffsetRequest) -> None:
    field_available_for_change = ['status_id']
    if not body.__fields_set__.issubset(field_available_for_change):
        abort(403, 'Offset holder but not creator cannot change the following fields: {}'.format(
            ', '.join(body.__fields_set__ - set(field_available_for_change))))

    if 'status_id' in body.__fields_set__:
        status = OffsetStatus.query.filter_by(id=body.status_id).first()
        valid_status_names = [OffsetStatuses.MARKETPLACE, OffsetStatuses.NOT_LISTED]
        if status.name not in valid_status_names:
            abort(403, f'Offset holder but not creator can only change status to {valid_status_names}')
        offset.offset_status = status


def is_user_creator_and_current_holder(user_roles: list[str], offset: Offset, current_user: User) -> bool:
    return Roles.CUSTOMER in user_roles \
        and offset.project.company_id == current_user.customer.company_id \
        and offset.owned_by_company_id == current_user.customer.company_id


def is_user_current_holder_but_not_creator(user_roles: list[str], offset: Offset, current_user: User) -> bool:
    return Roles.CUSTOMER in user_roles \
        and offset.project.company_id != current_user.customer.company_id \
        and offset.owned_by_company_id == current_user.customer.company_id


def update_fields_by_moderator(offset: Offset, body: UpdateOffsetRequest) -> None:
    fields_moderator_can_change = ['status_id']
    if not body.__fields_set__.issubset(fields_moderator_can_change):
        abort(403, 'Moderator cannot change the following fields: {}'.format(
            ', '.join(body.__fields_set__ - set(fields_moderator_can_change))))
    if 'status_id' in body.__fields_set__:
        new_status = OffsetStatus.query.filter_by(id=body.status_id).first()
        offset.offset_status = new_status


def set_status_based_on_creator_action(offset: Offset, body: UpdateOffsetRequest) -> None:
    if body.__fields_set__ and 'status_id' not in body.__fields_set__:
        new_status = OffsetStatus.query.filter_by(name=OffsetStatuses.PENDING).first()
        offset.offset_status = new_status


def update_fields_by_creator(offset: Offset, body: UpdateOffsetRequest) -> None:
    if 'project_id' in body.__fields_set__:
        project = Project.query.filter_by(id=body.project_id).first()
        offset.project = project

    if 'short_description' in body.__fields_set__:
        offset.short_description = body.short_description

    if 'unit_count' in body.__fields_set__:
        offset.unit_count = body.unit_count

    if 'unit_creation_year' in body.__fields_set__:
        offset.unit_creation_year = body.unit_creation_year

    if 'unit_price' in body.__fields_set__:
        offset.unit_price = body.unit_price

    if 'currency_id' in body.__fields_set__:
        currency = Currency.query.filter_by(id=body.currency_id).first()
        offset.currency = currency

    if 'unit_type' in body.__fields_set__:
        offset_unit_type = OffsetService.create_or_get_unit_type(body.unit_type)
        offset.unit_type = offset_unit_type

    if 'audit_unit' in body.__fields_set__:
        offset_audit_unit = OffsetService.create_or_get_audit_unit(body.audit_unit)
        offset.audit_unit = offset_audit_unit

    if 'status_id' in body.__fields_set__:
        status = OffsetStatus.query.filter_by(id=body.status_id).first()
        valid_status_names = [OffsetStatuses.PENDING, OffsetStatuses.REJECTED, OffsetStatuses.NOT_LISTED]
        if status.name not in valid_status_names:
            abort(403, f'Offset creator can only set status to {valid_status_names}')
        offset.offset_status = status


def create_offset_units(offset: Offset):
    print('\U0001F6A8 Saving offset units')
    offset_units = [OffsetUnit(id=uuid.uuid4(), offset_id=offset.id) for _ in range(offset.unit_count)]
    db.session.bulk_save_objects(offset_units)
    db.session.commit()
    print('\U0001F6A8 Offset units saved to db')

    offset_units_ids = [str(offset_unit.id) for offset_unit in offset_units]
    offset_units_ids_count = len(offset_units_ids)
    offset_unit_owner_id = f'company_{offset.owned_by_company_id}'
    offset_units_blockchain_batch = 200

    for start_index in range(0, offset_units_ids_count, offset_units_blockchain_batch):
        next_end_index = start_index + offset_units_blockchain_batch
        correct_end_index = next_end_index if next_end_index <= offset_units_ids_count else offset_units_ids_count
        tmp_offset_units_ids = offset_units_ids[start_index:correct_end_index]

        print(f'\U0001F6A8 Creating offset units on blockchain: {tmp_offset_units_ids}')
        result = create_tokens_on_blockchain(tmp_offset_units_ids, offset_unit_owner_id)

        if result:
            print('\U0001F6A8 Offset units saved to blockchain')
        else:
            print('\U0001F6A8 Problem while saving offset units to blockchain')


def should_create_offset_units(offset: Offset, is_moderator: bool):
    offset_status = OffsetStatus.query.filter_by(id=offset.offset_status_id).first()

    if offset_status.name != OffsetStatuses.ACCEPTED:
        return False

    if not is_moderator:
        return False

    offset_units_count = OffsetUnit.query.filter_by(offset_id=offset.id).count()

    if offset_units_count == offset.unit_count:
        return False

    return True
