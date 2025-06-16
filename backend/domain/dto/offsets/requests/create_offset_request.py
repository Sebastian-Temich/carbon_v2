from datetime import date
from uuid import UUID

from pydantic import Field, validator

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.offset_audit_units.requests.assign_offset_audit_unit_request import AssignAuditUnitRequest
from domain.dto.offset_unit_types.requests.assign_offset_unit_type_request import AssignOffsetUnitTypeRequest
from domain.entities import Project, Currency
from domain.enums.api_error_code_enum import ApiErrorCodes


class CreateOffsetRequest(BasePydanticModel):
    project_id: UUID
    short_description: str
    unit_count: int = Field(..., ge=1, example=1)
    unit_creation_year: date
    unit_price: float = Field(..., gt=0.0, example=1.5, scale=1)
    currency_id: UUID = Field(..., example='00000000-0000-0000-0000-000000000001')
    unit_type: AssignOffsetUnitTypeRequest
    audit_unit: AssignAuditUnitRequest

    @validator('project_id')
    def project_id_must_exist_in_database(cls, v):
        if not Project.query.filter_by(id=v).first():
            raise ValueError('Project with given id does not exist')
        return v

    @validator('unit_count')
    def unit_count_must_be_correct_range(cls, v):
        if v > 10_000_000:
            raise ValueError(ApiErrorCodes.NUMBER_TOO_LARGE)
        return v

    @validator('currency_id')
    def currency_id_must_exist_in_database(cls, v):
        if not Currency.query.filter_by(id=v).first():
            raise ValueError('Currency with given id does not exist')
        return v

    @validator('short_description')
    def short_description_must_be_correct_length(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 512:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v
