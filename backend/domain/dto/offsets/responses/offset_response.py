from datetime import date, datetime
from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.currency.responses.currency_response import CurrencyResponse
from domain.dto.offset_audit_units.responses.offset_audit_unit_response import OffsetAuditUnitResponse
from domain.dto.offset_status.responses.offset_status_response import OffsetStatusResponse
from domain.dto.offset_unit_types.responses.offset_unit_type_response import OffsetUnitTypeResponse
from domain.dto.projects.responses.project_response import ProjectResponse


class OffsetResponse(BasePydanticModel):
    id: UUID
    short_description: str
    unit_count: int
    unit_creation_year: date
    unit_price: float
    retirement_date: datetime = None
    currency: CurrencyResponse
    unit_type: OffsetUnitTypeResponse
    audit_unit: OffsetAuditUnitResponse
    offset_status: OffsetStatusResponse
    project: ProjectResponse
    owned_by_company_id: UUID
    is_owner_original: bool = None
