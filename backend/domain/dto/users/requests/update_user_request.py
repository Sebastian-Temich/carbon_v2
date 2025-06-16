from typing import Optional

from pydantic import EmailStr, validator

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.entities import User
from domain.enums.api_error_code_enum import ApiErrorCodes


class UpdateUserRequest(BasePydanticModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone: Optional[str] = None
    identity_card_number: Optional[str] = None

    @validator('email')
    def email_must_not_be_taken(cls, v):
        if User.query.filter_by(email=v).first():
            raise ValueError(ApiErrorCodes.EMAIL_TAKEN)
        return v
