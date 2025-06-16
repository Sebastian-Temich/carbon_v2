from datetime import datetime
from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.companies.responses.short_company_response import ShortCompanyResponse
from domain.dto.offset_logs.responses.offset_log_offset_response import OffsetLogOffsetResponse
from domain.dto.projects.responses.short_project_response import ShortProjectResponse


class OffsetLogResponse(BasePydanticModel):
    id: UUID
    source_offset: OffsetLogOffsetResponse
    target_offset: OffsetLogOffsetResponse
    unit_price: float = Field(..., example=1.23)
    unit_count: int = Field(..., example=3)
    unit_type: str = Field(..., example="Unit Type 1")
    audit_unit: str = Field(..., example="Audit Unit 1")
    action: str = Field(..., example="BUY")
    currency: str = Field(..., currency="EUR")
    company: ShortCompanyResponse
    project: ShortProjectResponse
    created_at: datetime = Field(..., example="2021-01-01T00:00:00.000000Z")
