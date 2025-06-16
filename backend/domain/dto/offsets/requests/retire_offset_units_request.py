from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class RetireOffsetUnitsRequest(BasePydanticModel):
    unit_count: int = Field(..., ge=1)
