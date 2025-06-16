from automapper import mapper
from flask import jsonify

from domain.dto.offset_status.responses.offset_status_response import OffsetStatusResponse
from domain.entities import OffsetStatus


def handle_get_offset_statuses():
    offset_statuses = OffsetStatus.query.order_by(OffsetStatus.id).all()
    offset_status_responses = []
    for offset_status in offset_statuses:
        offset_status_response = mapper.to(OffsetStatusResponse).map(offset_status)
        offset_status_responses.append(offset_status_response.dict())

    response = jsonify(offset_status_responses)
    return response, 200
