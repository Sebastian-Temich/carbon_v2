from flask_openapi3 import Tag, APIBlueprint

from application.controllers.offset.create_offset_handler import handle_create_offset
from application.controllers.offset.get_offset_handler import handle_get_offset
from application.controllers.offset.get_offset_summary_file import handle_get_offset_summary_file
from application.controllers.offset.get_offset_units_handler import handle_get_offset_units
from application.controllers.offset.get_offset_units_handler import handle_get_offset_units
from application.controllers.offset.get_offsets_handler import handle_get_offsets
from application.controllers.offset.purchase_offset_handler import handle_purchase_offset
from application.controllers.offset.retire_offset_handler import handle_retire_offset
from application.controllers.offset.sell_offset_handler import handle_sell_offset
from application.controllers.offset.update_offset_handler import handle_update_offset
from application.utils.jwt import authorize, security
from domain.dto.base_pydantic_model import BaseModel, BasePydanticModel
from domain.dto.errors.error import ErrorResponse
from domain.dto.offsets.path_params.get_offset_path_params import GetOffsetPathParams
from domain.dto.offsets.requests.buy_offset_request import BuyOffsetRequest
from domain.dto.offsets.requests.create_offset_request import CreateOffsetRequest
from domain.dto.offsets.requests.retire_offset_units_request import RetireOffsetUnitsRequest
from domain.dto.offsets.requests.sell_offset_request import SellOffsetRequest
from domain.dto.offsets.requests.update_offset_request import UpdateOffsetRequest
from domain.dto.offsets.responses.offset_list_response import OffsetListResponse
from domain.dto.offsets.responses.offset_response import OffsetResponse
from domain.dto.offsets.responses.offset_unit_list_response import OffsetUnitListResponse
from domain.dto.query_params.offset_query import OffsetQuery
from domain.dto.query_params.pagination_params import PaginationParams
from domain.enums.role_enum import Roles

offsets_tag = Tag(name='Offsets')
offsets_bp = APIBlueprint('Offsets', __name__, url_prefix='/offsets', abp_tags=[offsets_tag])


@offsets_bp.post('', responses={'201': OffsetResponse}, security=security)
@authorize(roles=[Roles.CUSTOMER, Roles.ADMIN])
def create_offset(body: CreateOffsetRequest):
    """
    Create a new offset.
    """
    return handle_create_offset(body)


@offsets_bp.get('', responses={'200': OffsetListResponse}, security=security)
@authorize()
def get_offsets(query: OffsetQuery):
    """
    Returns a list of offsets with filtering and pagination.
    <ul>
        <li><big>string filters are case-insensitive and can be partial matches</big></li>
        <li><big>SDG filter is 'contains all'</big></li>
    </ul>
    """
    return handle_get_offsets(query)


@offsets_bp.get('/<uuid:offsetId>', responses={'200': OffsetResponse, '404': ErrorResponse}, security=security)
@authorize()
def get_offset(path: GetOffsetPathParams):
    """
    Returns a single offset.
    """
    return handle_get_offset(path.offset_id)


@offsets_bp.get('/<uuid:offsetId>/units', responses={'200': OffsetUnitListResponse, '404': ErrorResponse},
                security=security)
@authorize()
def get_offset_units(path: GetOffsetPathParams, query: PaginationParams):
    """
    Returns a list of offset units.
    """
    return handle_get_offset_units(path.offset_id, query)


@offsets_bp.post('/<uuid:offsetId>/units/retire', responses={'200': OffsetResponse}, security=security)
@authorize([Roles.CUSTOMER])
def retire_offset(path: GetOffsetPathParams, body: RetireOffsetUnitsRequest):
    """
    Retires units from an offset.
    """
    return handle_retire_offset(path.offset_id, body)


@offsets_bp.patch('/<uuid:offsetId>', responses={'200': OffsetResponse, '404': ErrorResponse}, security=security)
@authorize([Roles.CUSTOMER, Roles.MODERATOR])
def update_offset(path: GetOffsetPathParams, body: UpdateOffsetRequest):
    """
    Updates a single offset.
    Every field present in the request body will be updated.
    Fields not present in the request body will be left unchanged.
    Moderators can only update the status field.
    Any change made by the Customer will result in the status being set to PENDING.
    """
    return handle_update_offset(path.offset_id, body)


@offsets_bp.post('/<uuid:offsetId>/buy', responses={'200': BasePydanticModel}, security=security)
@authorize([Roles.CUSTOMER])
def purchase_offset(path: GetOffsetPathParams, body: BuyOffsetRequest):
    """
    Allows a customer to create a purchase order for the offset's units.
    """
    return handle_purchase_offset(path.offset_id, body)


@offsets_bp.post('/<uuid:offsetId>/sell', responses={'200': OffsetResponse}, security=security)
@authorize([Roles.CUSTOMER])
def sell_offset(path: GetOffsetPathParams, body: SellOffsetRequest):
    """
    Puts an offset up for sale on the marketplace.
    """
    return handle_sell_offset(path.offset_id, body)


@offsets_bp.get('/<uuid:offsetId>/summary-file', responses={'200': BaseModel}, security=security)
@authorize([Roles.CUSTOMER])
def get_offset_summary_file(path: GetOffsetPathParams):
    """
    Downloads file with offset summary.
    Now works only for offset with status Retired.
    """
    return handle_get_offset_summary_file(path.offset_id)
