from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.roles.responses.role_response import RoleResponse


class RoleListResponse(BasePydanticModel):
    __root__: list[RoleResponse]
