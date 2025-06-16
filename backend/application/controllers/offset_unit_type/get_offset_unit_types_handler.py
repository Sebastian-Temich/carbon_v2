from flask import jsonify, Response

from domain.dto.offset_unit_types.responses.offset_unit_type_response import OffsetUnitTypeResponse
from domain.entities import OffsetUnitType


def handle_get_offset_unit_types() -> tuple[Response, int]:
    offset_unit_types = OffsetUnitType.query.order_by(OffsetUnitType.created_at).all()
    offset_unit_type_responses = []
    for offset_unit_type in offset_unit_types:
        offset_unit_type_response = OffsetUnitTypeResponse.from_orm(offset_unit_type)
        offset_unit_type_responses.append(offset_unit_type_response.dict())

    response = jsonify(offset_unit_type_responses)
    return response, 200
