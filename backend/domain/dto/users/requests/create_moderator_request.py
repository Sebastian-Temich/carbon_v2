from pydantic import EmailStr, validator, Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.entities.user import User
from domain.enums.api_error_code_enum import ApiErrorCodes


class CreateModeratorRequest(BasePydanticModel):
    first_name: str = Field(..., example='John')
    last_name: str = Field(..., example='Doe')
    email: EmailStr
    phone: str = Field(..., example="123456789")

    @validator('first_name')
    def first_name_must_be_correct_length(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 64:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v

    @validator('last_name')
    def last_name_must_be_correct_length(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 128:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v

    @validator('email')
    def email_is_not_taken(cls, v):
        if User.query.filter_by(email=v).first():
            raise ValueError(ApiErrorCodes.EMAIL_TAKEN)
        return v

    @validator('phone')
    def phone_must_be_correct_length(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 64:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v
