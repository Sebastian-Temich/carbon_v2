from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class OffsetUnitTypeResponse(BasePydanticModel):
    id: UUID
    name: str
