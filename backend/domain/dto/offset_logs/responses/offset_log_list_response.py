from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.offset_logs.responses.offset_log_response import OffsetLogResponse


class OffsetLogListResponse(BasePydanticModel):
    __root__: list[OffsetLogResponse]
