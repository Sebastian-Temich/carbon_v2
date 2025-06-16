from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class DeleteUserParams(BasePydanticModel):
    user_id: UUID
