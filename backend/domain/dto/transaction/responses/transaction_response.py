from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.companies.responses.company_response import CompanyResponse
from domain.dto.offsets.responses.offset_response import OffsetResponse
from domain.dto.transaction_status.responses.transaction_status_response import TransactionStatusResponse


class TransactionResponse(BasePydanticModel):
    id: UUID
    unit_count: int = Field(..., example=100)
    unit_price: float = Field(..., example=1.23)
    transaction_status: TransactionStatusResponse
    offset: OffsetResponse
    company: CompanyResponse
