from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import Field, root_validator

from domain.dto.query_params.pagination_params import PaginationParams


class OffsetLogsQuery(PaginationParams):
    project_ids: Optional[list[UUID]] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    project_name: Optional[str] = Field(None, description='Example: Project Name')
    project_sdg_ids: Optional[list[UUID]] = Field(
        None, description='Example: [00000000-0000-0000-0000-000000000000]')
    project_standard_ids: Optional[list[UUID]] = Field(
        None, description='Example: [00000000-0000-0000-0000-000000000000]')
    project_country_ids: Optional[list[UUID]] = Field(
        None, description='Example: [00000000-0000-0000-0000-000000000000]')

    project_creation_date_from: Optional[date] = Field(None, description='Example: 2021-12-28T22:18:29.823000')
    project_creation_date_to: Optional[date] = Field(None, description='Example: 2021-12-28T22:18:29.823000')

    project_total_unit_count_from: Optional[int] = Field(None, description='Example: 100')
    project_total_unit_count_to: Optional[int] = Field(None, description='Example: 1000')

    unit_type_ids: Optional[list[UUID]] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    audit_unit_ids: Optional[list[UUID]] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')

    @root_validator
    def validate_project_creation_dates(cls, values):
        project_creation_date_from = values.get('project_creation_date_from')
        project_creation_date_to = values.get('project_creation_date_to')

        if project_creation_date_from and project_creation_date_to:
            if project_creation_date_from > project_creation_date_to:
                raise ValueError('project_creation_date_from cannot be greater than project_creation_date_to')
        return values

    @root_validator
    def validate_project_total_unit_count(cls, values):
        project_total_unit_count_from = values.get('project_total_unit_count_from')
        project_total_unit_count_to = values.get('project_total_unit_count_to')

        if project_total_unit_count_from and project_total_unit_count_to:
            if project_total_unit_count_from > project_total_unit_count_to:
                raise ValueError('project_total_unit_count_from cannot be greater than project_total_unit_count_to')
        return values
