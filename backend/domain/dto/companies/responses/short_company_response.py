from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class ShortCompanyResponse(BasePydanticModel):
    id: UUID
    name: str = Field(..., example="Company name")
