from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class GetOffsetPathParams(BasePydanticModel):
    offset_id: UUID
