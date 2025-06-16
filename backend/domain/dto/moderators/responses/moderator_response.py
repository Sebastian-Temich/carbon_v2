from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class ModeratorResponse(BasePydanticModel):
    id: UUID
    phone_number: str = Field(..., example="123456789")
