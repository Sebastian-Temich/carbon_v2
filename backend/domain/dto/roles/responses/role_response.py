from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class RoleResponse(BasePydanticModel):
    id: UUID
    name: str
