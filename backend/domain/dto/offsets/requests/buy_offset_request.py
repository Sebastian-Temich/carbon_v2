from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class BuyOffsetRequest(BasePydanticModel):
    unit_count: int = Field(..., description='The number of units to buy.', example=1, ge=1)
