from flask_openapi3 import Tag, APIBlueprint

from application.controllers.offset_log.get_offset_logs_handler import handle_get_offset_logs
from domain.dto.offset_logs.responses.offset_logs_and_statistics_response import OffsetLogsAndStatisticsResponse
from domain.dto.query_params.offset_logs_query import OffsetLogsQuery

offset_logs_tag = Tag(name='Offset Logs')
offset_logs_bp = APIBlueprint('Offset Logs', __name__, url_prefix='/offset-logs', abp_tags=[offset_logs_tag])


@offset_logs_bp.get('', responses={'200': OffsetLogsAndStatisticsResponse})
def get_offset_logs(query: OffsetLogsQuery):
    """
    Returns statistics and offset logs for projects with filtering and pagination.
    SDG filtering is 'AND' logic.
    This endpoint has pagination for the offset logs.
    Offset logs are sorted by date in descending order.
    Log actions: SELL, BUY, RETIRE.
    """
    return handle_get_offset_logs(query)
