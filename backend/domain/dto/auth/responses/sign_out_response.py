from domain.dto.base_pydantic_model import BasePydanticModel


class SignOutResponse(BasePydanticModel):
    message: str
