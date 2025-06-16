from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.offsets.responses.offset_unit_response import OffsetUnitResponse


class OffsetUnitListResponse(BasePydanticModel):
    __root__: list[OffsetUnitResponse]
