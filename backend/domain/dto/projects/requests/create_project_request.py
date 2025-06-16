import base64
from datetime import datetime
from uuid import UUID

import bitmath
from pydantic import validator, Field, root_validator

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.file.requests.upload_image_without_name_request import UploadImageWithoutNameRequest
from domain.dto.project_standard.requests.assign_project_standard_request import AssignProjectStandardRequest
from domain.entities import Project
from domain.entities.country import Country
from domain.entities.sustainable_development_goal import SustainableDevelopmentGoal
from domain.enums.api_error_code_enum import ApiErrorCodes


class CreateProjectRequest(BasePydanticModel):
    name: str = Field(..., example='Project name')
    description: str = Field(..., example='Project description')
    address: str = Field(..., example='3828 Simons Hollow Road, Wilkes Barre, PA 18702')
    country_id: UUID = Field(..., example='00000000-0000-0000-0000-000000000001')
    project_standard: AssignProjectStandardRequest
    start_date: datetime
    expected_end_date: datetime
    unit_generation_start_date: datetime
    unit_generation_end_date: datetime
    sustainable_development_goal_ids: list[UUID] = Field(..., example=['00000000-0000-0000-0000-000000000001'])
    circularity: str = Field(..., example='Project circularity')
    image: UploadImageWithoutNameRequest = None

    @validator('name')
    def name_must_be_correct_length(cls, v: str):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 256:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v

    @validator('name')
    def name_must_be_unique(cls, v: str):
        if Project.query.filter_by(name=v).first():
            raise ValueError(ApiErrorCodes.NAME_MUST_BE_UNIQUE)
        return v

    @validator('description')
    def description_must_be_correct_length(cls, v: str):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 1024:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v

    @validator('address')
    def address_must_be_correct_length(cls, v: str):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 256:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v

    @validator('image')
    def image_size_must_not_exceed_5_mb(cls, v: UploadImageWithoutNameRequest):
        if v.content_as_base64 is not None:
            decoded_content = base64.b64decode(v.content_as_base64)
            if bitmath.Byte(len(decoded_content)).to_MiB() > 5:
                raise ValueError(ApiErrorCodes.FILE_TOO_LARGE)
        return v

    @validator('country_id')
    def country_id_must_exist_in_database(cls, v: UUID):
        if not Country.query.filter_by(id=v).first():
            raise ValueError('Country with given id does not exist')
        return v

    @validator('project_standard')
    def project_standard_must_not_be_empty(cls, v: AssignProjectStandardRequest):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('start_date')
    def start_date_must_not_be_empty(cls, v: datetime):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('expected_end_date')
    def expected_end_date_must_not_be_empty(cls, v: datetime):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @root_validator
    def start_date_must_be_before_expected_end_date(cls, values):
        if values.get('start_date') and values.get('expected_end_date'):
            if values.get('start_date') > values.get('expected_end_date'):
                raise ValueError('start_date must be before expected_end_date')
        return values

    @validator('unit_generation_start_date')
    def unit_generation_start_date_must_not_be_empty(cls, v: datetime):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @validator('unit_generation_end_date')
    def unit_generation_end_date_must_not_be_empty(cls, v: datetime):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        return v

    @root_validator
    def unit_generation_start_date_must_be_before_unit_generation_end_date(cls, values):
        if values.get('unit_generation_start_date') and values.get('unit_generation_end_date'):
            if values.get('unit_generation_start_date') > values.get('unit_generation_end_date'):
                raise ValueError('unit_generation_start_date must be before unit_generation_end_date')
        return values

    @validator('sustainable_development_goal_ids')
    def sustainable_development_goal_ids_must_exist_in_database(cls, v: list[UUID]):
        for sustainable_development_goal_id in v:
            if not SustainableDevelopmentGoal.query.filter_by(id=sustainable_development_goal_id).first():
                raise ValueError(f'Sustainable development goal with id {sustainable_development_goal_id} not found')
        return v

    @validator('circularity')
    def circularity_must_be_correct_length(cls, v: str):
        if not v:
            raise ValueError(ApiErrorCodes.FIELD_NOT_EMPTY)
        if len(v) > 512:
            raise ValueError(ApiErrorCodes.STRING_TOO_LONG)
        return v
