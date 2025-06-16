from uuid import UUID

from pydantic import root_validator, validator, Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.entities import OffsetUnitType
from domain.enums.api_error_code_enum import ApiErrorCodes


class AssignOffsetUnitTypeRequest(BasePydanticModel):
    existing_offset_unit_type_id: UUID = Field(None, example='00000000-0000-0000-0000-000000000001')
    new_offset_unit_type_name: str = Field(None, example='Custom Unit Type 1')

    @root_validator()
    def only_one_of_existing_unit_type_id_and_new_unit_type_name_must_be_provided(cls, values):
        if values.get('existing_offset_unit_type_id') and values.get('new_offset_unit_type_name'):
            raise ValueError('Only one of existing_offset_unit_type_id and new_offset_unit_type_name must be provided')
        return values

    @validator('existing_offset_unit_type_id')
    def existing_unit_type_id_must_exist_in_database(cls, v):
        if v and not OffsetUnitType.query.filter_by(id=v).first():
            raise ValueError('UnitType with given id does not exist')
        return v

    @validator('new_offset_unit_type_name')
    def new_unit_type_name_must_not_be_empty_when_provided(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('new_offset_unit_type_name')
    def new_unit_type_name_must_not_exist_in_database_when_provided(cls, v):
        if v and OffsetUnitType.query.filter_by(name=v).first():
            raise ValueError(ApiErrorCodes.NAME_MUST_BE_UNIQUE)
        return v
