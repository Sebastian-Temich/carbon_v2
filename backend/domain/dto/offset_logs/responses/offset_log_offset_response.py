from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.companies.responses.short_company_response import ShortCompanyResponse


class OffsetLogOffsetResponse(BasePydanticModel):
    id: UUID
    company: ShortCompanyResponse
