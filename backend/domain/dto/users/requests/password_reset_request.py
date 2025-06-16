from pydantic import validator

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.entities import User
from domain.enums.api_error_code_enum import ApiErrorCodes


class PasswordResetRequest(BasePydanticModel):
    email: str

    @validator('email')
    def email_exists(cls, v):
        if not User.query.filter_by(email=v).first():
            raise ValueError(ApiErrorCodes.EMAIL_NOT_FOUND)
        return v
