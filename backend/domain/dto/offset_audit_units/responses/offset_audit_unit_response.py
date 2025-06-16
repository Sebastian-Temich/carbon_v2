from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class OffsetAuditUnitResponse(BasePydanticModel):
    id: UUID
    name: str
