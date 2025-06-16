import uuid

from flask import abort, jsonify, Response
from flask_jwt_extended import get_current_user

from application.services.offset_service import OffsetService
from domain.dto.offsets.requests.create_offset_request import CreateOffsetRequest
from domain.entities import Offset, Project, Currency, OffsetStatus
from domain.enums.offset_status_enum import OffsetStatuses
from infrastructure.database.db import db


def handle_create_offset(body: CreateOffsetRequest) -> tuple[Response, int]:
    current_user = get_current_user()
    customer = current_user.customer

    if Project.query.get(body.project_id).company_id != customer.company_id:
        abort(403, 'Project not found')

    offset = create_offset(body)
    db.session.commit()

    offset_response = OffsetService.get_offset_response(offset)
    response = jsonify(offset_response.dict())

    return response, 201


def create_offset(body: CreateOffsetRequest) -> Offset:
    offset_unit_type = OffsetService.create_or_get_unit_type(body.unit_type)
    offset_audit_unit = OffsetService.create_or_get_audit_unit(body.audit_unit)
    project = Project.query.get(body.project_id)
    currency = Currency.query.get(body.currency_id)
    status = OffsetStatus.query.filter_by(name=OffsetStatuses.PENDING).first()

    offset = Offset(
        id=uuid.uuid4(),
        project=project,
        short_description=body.short_description,
        unit_count=body.unit_count,
        offset_status=status,
        unit_type=offset_unit_type,
        unit_price=body.unit_price,
        currency=currency,
        unit_creation_year=body.unit_creation_year,
        audit_unit=offset_audit_unit,
        owned_by_company=project.company
    )
    db.session.add(offset)

    return offset
