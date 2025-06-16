from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.offset_logs.responses.offset_log_response import OffsetLogResponse


class OffsetLogsAndStatisticsResponse(BasePydanticModel):
    total_unit_count: int = Field(..., example=100)
    sold_unit_count: int = Field(..., example=60)
    not_sold_unit_count: int = Field(..., example=40)
    retired_unit_count: int = Field(..., example=25)
    sold_and_not_retired_unit_count: int = Field(..., example=35)

    offset_logs: list[OffsetLogResponse]
