from flask_openapi3 import APIBlueprint, Tag

from application.controllers.offset_unit_type.get_offset_unit_types_handler import handle_get_offset_unit_types
from domain.dto.offset_unit_types.responses.offset_unit_type_list_response import OffsetUnitTypeListResponse

offset_unit_types_tag = Tag(name='Offset Unit Types')
offset_unit_types_bp = APIBlueprint('Offset Unit Types', __name__,
                                    url_prefix='/offset-unit-types', abp_tags=[offset_unit_types_tag])


@offset_unit_types_bp.get('', responses={'200': OffsetUnitTypeListResponse})
def get_offset_unit_types():
    """
    Returns a list of offset unit types.
    """
    return handle_get_offset_unit_types()
