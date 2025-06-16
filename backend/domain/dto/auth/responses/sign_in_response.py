from domain.dto.base_pydantic_model import BasePydanticModel


class SignInResponse(BasePydanticModel):
    message: str
