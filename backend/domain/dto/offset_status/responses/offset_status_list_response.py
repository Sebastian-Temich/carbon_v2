from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.offset_status.responses.offset_status_response import OffsetStatusResponse


class OffsetStatusListResponse(BasePydanticModel):
    __root__: list[OffsetStatusResponse]
