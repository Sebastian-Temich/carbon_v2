from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.offset_unit_types.responses.offset_unit_type_response import OffsetUnitTypeResponse


class OffsetUnitTypeListResponse(BasePydanticModel):
    __root__: list[OffsetUnitTypeResponse]
