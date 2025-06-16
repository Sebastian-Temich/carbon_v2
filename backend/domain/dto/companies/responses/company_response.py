from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.company_adresses.responses.company_address_response import CompanyAddressResponse


class CompanyResponse(BasePydanticModel):
    id: UUID
    name: str = Field(..., example="Company name")
    NIP: str = Field(..., example="1234567890")
    REGON: str = Field(..., example="123456789")
    KRS: str = Field(..., example="1234567890")
    representatives: list[str] = Field(..., example=["John Doe", "Jane Doe"])
    address: CompanyAddressResponse
