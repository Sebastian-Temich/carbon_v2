from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class UpdateUserParams(BasePydanticModel):
    user_id: UUID
