import base64
from datetime import datetime
from typing import Optional
from uuid import UUID

import bitmath
from pydantic import Field, validator

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.file.requests.upload_image_without_name_request import UploadImageWithoutNameRequest
from domain.dto.project_standard.requests.assign_project_standard_request import AssignProjectStandardRequest
from domain.entities import Project, Country, SustainableDevelopmentGoal
from domain.enums.api_error_code_enum import ApiErrorCodes


class UpdateProjectRequest(BasePydanticModel):
    name: Optional[str] = Field(None, example='Project name')
    description: Optional[str] = Field(None, example='Project description')
    address: Optional[str] = Field(None, example='3828 Simons Hollow Road, Wilkes Barre, PA 18702')
    country_id: Optional[UUID] = Field(None, example='00000000-0000-0000-0000-000000000001')
    project_standard: Optional[AssignProjectStandardRequest] = None
    start_date: Optional[datetime] = None
    expected_end_date: Optional[datetime] = None
    unit_generation_start_date: Optional[datetime] = None
    unit_generation_end_date: Optional[datetime] = None
    sustainable_development_goal_ids: Optional[list[UUID]] = Field(
        None, example=['00000000-0000-0000-0000-000000000001'])
    circularity: Optional[str] = Field(None, example='Project circularity')
    image: Optional[UploadImageWithoutNameRequest] = None

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
        if v and v.content_as_base64 is not None:
            decoded_content = base64.b64decode(v.content_as_base64)
            if bitmath.Byte(len(decoded_content)).to_MiB() > 5:
                raise ValueError(ApiErrorCodes.FILE_TOO_LARGE)
        return v

    @validator('country_id')
    def country_id_must_exist_in_database(cls, v: UUID):
        if v and not Country.query.filter_by(id=v).first():
            raise ValueError('Country not found')
        return v

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
