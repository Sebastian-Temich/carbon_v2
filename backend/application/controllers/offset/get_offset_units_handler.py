from uuid import UUID

from automapper import mapper
from flask import jsonify, Response

from application.config import Config
from application.utils.pagination import set_pagination_metadata
from domain.dto.offsets.responses.offset_unit_response import OffsetUnitResponse
from domain.dto.query_params.pagination_params import PaginationParams
from domain.entities import OffsetUnit


def handle_get_offset_units(offset_id: UUID, query: PaginationParams) -> tuple[Response, int]:
    offset_units = OffsetUnit.query
    offset_units = offset_units.filter_by(offset_id=offset_id)
    offset_units = offset_units.paginate(page=query.page, per_page=query.per_page, max_per_page=Config.PAGINATION_LIMIT)

    offset_units_response = [get_offset_units_response(offset_unit) for offset_unit in offset_units.items]
    offset_unit_dict_response = [offset_unit_response.dict() for offset_unit_response in offset_units_response]

    response = jsonify(offset_unit_dict_response)
    set_pagination_metadata(response, offset_units)
    return response, 200


def get_offset_units_response(offset_unit: OffsetUnit) -> OffsetUnitResponse:
    return mapper.to(OffsetUnitResponse).map(offset_unit)
