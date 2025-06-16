from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class CompanyAddressResponse(BasePydanticModel):
    street: str = Field(..., example="Street name")
    city: str = Field(..., example="City name")
    postal_code: str = Field(..., example="00-000")
