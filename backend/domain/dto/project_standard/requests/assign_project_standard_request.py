from uuid import UUID

from pydantic import root_validator, validator, Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.entities.project_standard import ProjectStandard
from domain.enums.api_error_code_enum import ApiErrorCodes


class AssignProjectStandardRequest(BasePydanticModel):
    existing_project_standard_id: UUID = Field(None, example='00000000-0000-0000-0000-000000000001')
    new_project_standard_name: str = Field(None, example='Custom Project Standard 1')

    @root_validator()
    def only_one_of_existing_project_standard_id_and_new_project_standard_name_must_be_provided(cls, values):
        if values.get('existing_project_standard_id') and values.get('new_project_standard_name'):
            raise ValueError('Only one of existing_project_standard_id and new_project_standard_name must be provided')
        return values

    @validator('existing_project_standard_id')
    def existing_project_standard_id_must_exist_in_database(cls, v):
        if v and not ProjectStandard.query.filter_by(id=v).first():
            raise ValueError('ProjectStandard with given id does not exist')
        return v

    @validator('new_project_standard_name')
    def new_project_standard_name_must_not_be_empty_when_provided(cls, v):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('new_project_standard_name')
    def new_project_standard_name_must_not_exist_in_database_when_provided(cls, v):
        if v and ProjectStandard.query.filter_by(name=v).first():
            raise ValueError(ApiErrorCodes.NAME_MUST_BE_UNIQUE)
        return v
