from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.offsets.responses.offset_response import OffsetResponse


class OffsetListResponse(BasePydanticModel):
    __root__: list[OffsetResponse]
