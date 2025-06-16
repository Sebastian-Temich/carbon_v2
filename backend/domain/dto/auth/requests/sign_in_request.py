from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class SignInRequest(BasePydanticModel):
    email: str = Field(..., example="user@example.com")
    password: str
