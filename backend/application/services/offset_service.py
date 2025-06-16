import uuid
from uuid import UUID

from automapper import mapper
from flask import abort
from sqlalchemy import desc

from application.services.project_service import ProjectService
from domain.dto.offset_audit_units.requests.assign_offset_audit_unit_request import AssignAuditUnitRequest
from domain.dto.offset_unit_types.requests.assign_offset_unit_type_request import AssignOffsetUnitTypeRequest
from domain.dto.offsets.responses.offset_response import OffsetResponse
from domain.entities import Project, Offset, OffsetUnitType, OffsetAuditUnit, OffsetUnit, Transaction, TransactionStatus
from domain.enums.transaction_status_enum import TransactionStatuses
from infrastructure.database.db import db


class OffsetService:
    @staticmethod
    def clone_offset(offset_id: UUID) -> Offset:
        old_offset = Offset.query.get(offset_id)
        if not old_offset:
            abort(404, 'Offset not found')

        offset = Offset(
            id=uuid.uuid4(),
            short_description=old_offset.short_description,
            unit_count=old_offset.unit_count,
            unit_price=old_offset.unit_price,
            unit_creation_year=old_offset.unit_creation_year,
            offset_status=old_offset.offset_status,
            currency=old_offset.currency,
            unit_type=old_offset.unit_type,
            audit_unit=old_offset.audit_unit,
            project=old_offset.project,
            owned_by_company=old_offset.owned_by_company,
        )
        return offset

    @staticmethod
    def get_offset_response(offset: Offset) -> OffsetResponse:
        offset_response = mapper.to(OffsetResponse).map(offset)
        offset_response.unit_count -= OffsetService.get_offset_pending_transactions_unit_count(offset.id)
        offset_response.is_owner_original = OffsetService.is_offset_from_original_owner(offset.id)
        offset_response.project = ProjectService.get_project_response(offset.project)
        return offset_response

    @staticmethod
    def get_offset_pending_transactions_unit_count(offset_id: UUID) -> int:
        pending_transaction_status_id = TransactionStatus.query.filter_by(name=TransactionStatuses.PENDING).first().id
        offset_pending_transactions = Transaction.query \
            .filter_by(offset_id=offset_id) \
            .filter_by(transaction_status_id=pending_transaction_status_id) \
            .all()
        pending_transactions_unit_count = sum([transaction.unit_count for transaction in offset_pending_transactions])
        return pending_transactions_unit_count

    @staticmethod
    def is_offset_from_original_owner(offset_id: UUID) -> bool:
        offset = Offset.query.get(offset_id)
        project = Project.query.get(offset.project.id)
        is_original_owner = offset.owned_by_company_id == project.company.id
        return is_original_owner

    @staticmethod
    def create_or_get_unit_type(assign_offset_unit_type_request: AssignOffsetUnitTypeRequest) -> OffsetUnitType:
        if assign_offset_unit_type_request.existing_offset_unit_type_id:
            return OffsetUnitType.query.get(assign_offset_unit_type_request.existing_offset_unit_type_id)
        else:
            offset_unit_type = OffsetUnitType(
                id=uuid.uuid4(),
                name=assign_offset_unit_type_request.new_offset_unit_type_name
            )
            db.session.add(offset_unit_type)
            return offset_unit_type

    @staticmethod
    def create_or_get_audit_unit(assign_audit_unit_request: AssignAuditUnitRequest) -> OffsetAuditUnit:
        if assign_audit_unit_request.existing_offset_audit_unit_id:
            return OffsetAuditUnit.query.get(assign_audit_unit_request.existing_offset_audit_unit_id)
        else:
            audit_unit = OffsetAuditUnit(
                id=uuid.uuid4(),
                name=assign_audit_unit_request.new_offset_audit_unit_name
            )
            db.session.add(audit_unit)
            return audit_unit

    @staticmethod
    def transfer_offset_units(from_offset: UUID, to_offset: UUID, count: int) -> list[UUID]:
        sub_query_offset_units = OffsetUnit.query \
            .order_by(desc(OffsetUnit.created_at)) \
            .filter_by(offset_id=from_offset) \
            .limit(count)
        sub_query_offset_units_ids = [offset_unit.id for offset_unit in sub_query_offset_units]
        OffsetUnit.query.filter(OffsetUnit.id.in_(sub_query_offset_units_ids)).update({'offset_id': to_offset})

        return sub_query_offset_units_ids
