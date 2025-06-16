from datetime import datetime, date
from uuid import UUID

from pydantic import Field

from domain.dto.query_params.pagination_params import PaginationParams


class OffsetQuery(PaginationParams):
    project_name: str = Field(None, description='Example: project name')
    project_location_country_id: UUID = Field(None, description='Example: 00000000-0000-0000-0000-000000000000')
    project_standard_id: UUID = Field(None, description='Example: 00000000-0000-0000-0000-000000000000')
    project_unit_generation_start_date: datetime = Field(None, description='Example: 2021-01-01T00:00:00')
    project_unit_generation_end_date: datetime = Field(None, description='Example: 2021-01-01T00:00:00')
    project_start_date: datetime = Field(None, description='Example: 2021-01-01T00:00:00')
    project_expected_end_date: datetime = Field(None, description='Example: 2021-01-01T00:00:00')
    project_sustainable_development_goal_ids: list[UUID] = Field(
        None, description='Example: [00000000-0000-0000-0000-000000000000]')
    project_circularity: str = Field(None, description='Example: circularity')

    unit_count_min: int = Field(None, description='Example: 1')
    unit_count_max: int = Field(None, description='Example: 100')
    unit_price_min: float = Field(None, description='Example: 1.0')
    unit_price_max: float = Field(None, description='Example: 100.0')
    currency_ids: list[UUID] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    unit_type_id: UUID = Field(None, description='Example: 00000000-0000-0000-0000-000000000000')
    audit_unit_id: UUID = Field(None, description='Example: 00000000-0000-0000-0000-000000000000')
    unit_creation_year: date = Field(None, description='Example: 2021-01-01')
    owned_by_company_id: UUID = Field(None, description='Example: 00000000-0000-0000-0000-000000000000')
    status_ids: list[UUID] = Field(None, description='Example: [00000000-0000-0000-0000-000000000000]')
    is_owner_original: bool = Field(None, description='Example: true')
