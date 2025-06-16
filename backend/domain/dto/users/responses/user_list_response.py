from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.customers.responses.customer_response import CustomerResponse
from domain.dto.moderators.responses.moderator_response import ModeratorResponse
from domain.dto.roles.responses.role_list_response import RoleListResponse


class UserListResponseItem(BasePydanticModel):
    id: UUID
    email: str
    first_name: str = Field(..., example='John')
    last_name: str = Field(..., example='Doe')
    is_active: bool
    roles: RoleListResponse
    customer: CustomerResponse | None
    moderator: ModeratorResponse | None


class UserListResponse(BasePydanticModel):
    __root__: list[UserListResponseItem]
