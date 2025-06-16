from uuid import UUID

from flask import jsonify, abort

from application.services.offset_service import OffsetService
from domain.entities import Offset


def handle_get_offset(offset_id: UUID):
    offset = Offset.query.get(offset_id)
    if not offset:
        abort(404, 'Offset not found')
    offset_response = OffsetService.get_offset_response(offset)
    response = jsonify(offset_response.dict())
    return response, 200
