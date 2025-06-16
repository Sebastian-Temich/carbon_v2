from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class CountryResponse(BasePydanticModel):
    id: UUID
    alpha3_code: str = Field(..., example="USA")
    name: str = Field(..., example="United States of America")
