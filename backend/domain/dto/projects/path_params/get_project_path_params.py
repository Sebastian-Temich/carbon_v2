from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class GetProjectPathParams(BasePydanticModel):
    project_id: UUID
