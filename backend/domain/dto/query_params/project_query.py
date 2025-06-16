from uuid import UUID

from pydantic import Field, root_validator

from domain.dto.query_params.pagination_params import PaginationParams


class ProjectQuery(PaginationParams):
    name: str = Field(None, description='Example: project name')
    company_id: UUID = Field(None, description='Example: 00000000-0000-0000-0000-000000000000')
    sdg_ids: list[UUID] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    unit_type_ids: list[UUID] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    audit_unit_ids: list[UUID] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    project_standard_ids: list[UUID] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    country_ids: list[UUID] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    creation_date_from: str = Field(None, description='Example: 2021-12-28T22:18:29.823000')
    creation_date_to: str = Field(None, description='Example: 2022-12-28T22:18:29.823000')
    total_unit_count_from: int = Field(None, description='Example: 100')
    total_unit_count_to: int = Field(None, description='Example: 1000')

    @root_validator
    def validate_creation_dates(cls, values):
        creation_date_from = values.get('creation_date_from')
        creation_date_to = values.get('creation_date_to')

        if creation_date_from and creation_date_to:
            if creation_date_from > creation_date_to:
                raise ValueError('creationDateFrom cannot be greater than creationDateTo')
        return values

    @root_validator
    def validate_total_unit_count(cls, values):
        total_unit_count_from = values.get('total_unit_count_from')
        total_unit_count_to = values.get('total_unit_count_to')

        if total_unit_count_from and total_unit_count_to:
            if total_unit_count_from > total_unit_count_to:
                raise ValueError('totalUnitCountFrom cannot be greater than totalUnitCountTo')
        return values
