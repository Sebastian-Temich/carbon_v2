from flask_openapi3 import Tag, APIBlueprint

from application.controllers.offset_audit_unit.get_offset_audit_units_handler import handle_get_offset_audit_units
from domain.dto.offset_audit_units.responses.offset_audit_unit_list_response import OffsetAuditUnitListResponse

offset_audit_units_tag = Tag(name='Offset Audit Units')
offset_audit_units_bp = APIBlueprint('Offset Audit Units', __name__,
                                     url_prefix='/offset-audit-units', abp_tags=[offset_audit_units_tag])


@offset_audit_units_bp.get('', responses={'200': OffsetAuditUnitListResponse})
def get_offset_audit_units():
    """
    Returns a list of offset audit units.
    """
    return handle_get_offset_audit_units()
