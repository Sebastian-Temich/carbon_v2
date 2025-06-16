from domain.dto.base_pydantic_model import BasePydanticModel


class PasswordResetResponse(BasePydanticModel):
    new_password: str
