import re

from pydantic import validator, Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.company_adresses.requests.create_company_address_request import CreateCompanyAddressRequest
from domain.enums.api_error_code_enum import ApiErrorCodes


class CreateCompanyRequest(BasePydanticModel):
    name: str = Field(..., example="Company name")
    NIP: str = Field(..., example="1234567890")
    REGON: str = Field(..., example="123456789")
    KRS: str = Field(..., example="1234567890")
    representatives: list[str] = Field(..., example=["John Doe", "Jane Doe"])
    address: CreateCompanyAddressRequest

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('NIP')
    def NIP_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if not re.match(r'^\d{10}$', v):
            raise ValueError(ApiErrorCodes.INVALID_LENGTH)
        return v

    @validator('REGON')
    def REGON_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if not re.match(r'^\d{9}$|^\d{14}$', v):
            raise ValueError(ApiErrorCodes.INVALID_LENGTH)
        return v

    @validator('KRS')
    def KRS_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if not re.match(r'^\d{10}$', v):
            raise ValueError(ApiErrorCodes.INVALID_LENGTH)
        return v

    @validator('representatives')
    def representatives_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.ARRAY_NOT_EMPTY)
        return v

    @validator('address')
    def address_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v
