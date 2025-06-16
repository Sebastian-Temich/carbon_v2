from domain.dto.base_pydantic_model import BasePydanticModel


class PasswordResetEmailData(BasePydanticModel):
    new_password: str
