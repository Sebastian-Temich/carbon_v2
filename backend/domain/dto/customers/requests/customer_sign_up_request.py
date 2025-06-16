import re

from pydantic import EmailStr, validator, Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.companies.requests.create_company_request import CreateCompanyRequest
from domain.entities.user import User
from domain.enums.api_error_code_enum import ApiErrorCodes


class CustomerSignUpRequest(BasePydanticModel):
    email: EmailStr
    first_name: str = Field(..., example='John')
    last_name: str = Field(..., example='Doe')
    phone_number: str = Field(..., example="123456789")
    identity_card_number: str = Field(..., example="ABC 123456")
    company: CreateCompanyRequest

    @validator('email')
    def email_is_not_taken(cls, v):
        if User.query.filter_by(email=v).first():
            raise ValueError(ApiErrorCodes.EMAIL_TAKEN)
        return v

    @validator('first_name')
    def first_name_must_be_correct_length(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 100:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v

    @validator('last_name')
    def last_name_must_be_correct_length(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 150:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v

    @validator('phone_number')
    def phone_number_must_be_correct_length(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 50:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v

    @validator('identity_card_number')
    def identity_card_number_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if not re.match(r'^[A-Z]{3}\s?\d{6}$', v):
            raise ValueError(ApiErrorCodes.INVALID_FORMAT)
        return v

    @validator('company')
    def company_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v
