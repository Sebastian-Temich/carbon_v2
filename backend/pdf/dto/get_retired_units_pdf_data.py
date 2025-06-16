from datetime import datetime

from domain.dto.base_pydantic_model import BasePydanticModel


class GetRetiredUnitsPdfData(BasePydanticModel):
    certificate_number: str
    unit_count: int
    company: str
    offset_id: str
    retirement_date: datetime
    emission_reduction_period_start: datetime
    emission_reduction_period_end: datetime
    project: str
    country: str
    address: str
    unit_creation_year: int
    audit_unit: str
    verification_report_number: str
