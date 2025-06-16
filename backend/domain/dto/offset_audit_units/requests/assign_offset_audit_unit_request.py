from uuid import UUID

from pydantic import root_validator, validator, Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.entities import OffsetAuditUnit
from domain.enums.api_error_code_enum import ApiErrorCodes


class AssignAuditUnitRequest(BasePydanticModel):
    existing_offset_audit_unit_id: UUID = Field(None, example='00000000-0000-0000-0000-000000000001')
    new_offset_audit_unit_name: str = Field(None, example='Custom Audit Unit 1')

    @root_validator()
    def only_one_of_existing_audit_unit_id_and_new_audit_unit_name_must_be_provided(cls, values):
        if values.get('existing_offset_audit_unit_id') and values.get('new_offset_audit_unit_name'):
            raise ValueError(
                'Only one of existing_offset_audit_unit_id and new_offset_audit_unit_name must be provided')
        return values

    @validator('existing_offset_audit_unit_id')
    def existing_audit_unit_id_must_exist_in_database(cls, v):
        if v and not OffsetAuditUnit.query.filter_by(id=v).first():
            raise ValueError('AuditUnit with given id does not exist')
        return v

    @validator('new_offset_audit_unit_name')
    def new_audit_unit_name_must_not_be_empty_when_provided(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('new_offset_audit_unit_name')
    def new_audit_unit_name_must_not_exist_in_database_when_provided(cls, v):
        if v and OffsetAuditUnit.query.filter_by(name=v).first():
            raise ValueError(ApiErrorCodes.NAME_MUST_BE_UNIQUE)
        return v
