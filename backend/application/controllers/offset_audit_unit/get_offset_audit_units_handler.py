from flask import jsonify, Response

from domain.dto.offset_audit_units.responses.offset_audit_unit_response import OffsetAuditUnitResponse
from domain.entities import OffsetAuditUnit


def handle_get_offset_audit_units() -> tuple[Response, int]:
    offset_audit_units = OffsetAuditUnit.query.order_by(OffsetAuditUnit.created_at).all()
    offset_audit_unit_responses = []
    for offset_audit_unit in offset_audit_units:
        offset_audit_unit_response = OffsetAuditUnitResponse.from_orm(offset_audit_unit)
        offset_audit_unit_responses.append(offset_audit_unit_response.dict())

    response = jsonify(offset_audit_unit_responses)
    return response, 200
