from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.companies.responses.company_response import CompanyResponse


class CustomerResponse(BasePydanticModel):
    id: UUID
    phone_number: str = Field(..., example="123456789")
    identity_card_number: str = Field(..., example="ABC 123456")
    company: CompanyResponse
