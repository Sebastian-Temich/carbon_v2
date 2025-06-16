from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class SellOffsetRequest(BasePydanticModel):
    unit_price: float = Field(..., description='The price per unit of the offset.', example=0.5, gt=0.0)
    unit_count: int = Field(..., description='The number of units of the offset.', example=100, gt=0)
