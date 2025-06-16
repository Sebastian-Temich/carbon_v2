from pydantic import validator, Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.enums.api_error_code_enum import ApiErrorCodes


class CreateCompanyAddressRequest(BasePydanticModel):
    street: str = Field(..., example="Street name")
    city: str = Field(..., example="City name")
    postal_code: str = Field(..., example="00-000")

    @validator('street')
    def street_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('city')
    def city_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('postal_code')
    def postal_code_must_not_be_empty(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v
