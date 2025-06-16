from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class CurrencyResponse(BasePydanticModel):
    id: UUID
    code: str = Field(..., example='PLN')
