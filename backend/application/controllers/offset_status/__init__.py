from flask_openapi3 import APIBlueprint, Tag

from application.controllers.offset_status.get_offset_statuses_handler import handle_get_offset_statuses
from domain.dto.offset_status.responses.offset_status_list_response import OffsetStatusListResponse

offset_statuses_tag = Tag(name='Offset Statuses')
offset_statuses_bp = APIBlueprint('Offset Statuses', __name__,
                                  url_prefix='/offset-statuses', abp_tags=[offset_statuses_tag])


@offset_statuses_bp.get('', responses={'200': OffsetStatusListResponse})
def get_offset_statuses():
    """
    Returns a list of offset statuses.
    PENDING - Offset from developer pending approval
    ACCEPTED - Offset from developer approved by moderator (on the marketplace)
    REJECTED - Offset from developer rejected by moderator
    NOT_LISTED - Offset not listed on the marketplace, in someone's portfolio
    MARKETPLACE - Offset listed on the marketplace again after being bought
    SOLD_OUT - Offset after all units have been sold
    RETIRED - Offset after all units have been sold and were later retired
    """
    return handle_get_offset_statuses()
