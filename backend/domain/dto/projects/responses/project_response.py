from datetime import datetime
from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.country.responses.country_response import CountryResponse
from domain.dto.project_standard.responses.project_standard_response import ProjectStandardResponse
from domain.dto.sustainable_development_goals.responses.software_development_goal_response import \
    SustainableDevelopmentGoalResponse


class ProjectResponse(BasePydanticModel):
    id: UUID
    name: str = Field(..., example='Project name')
    description: str = Field(..., example='Project description')
    address: str = Field(..., example='3828 Simons Hollow Road, Wilkes Barre, PA 18702')
    country: CountryResponse
    project_standard: ProjectStandardResponse
    start_date: datetime = Field(..., example='2023-12-28T22:18:29.823000')
    expected_end_date: datetime = Field(..., example='2024-12-28T22:18:29.823000')
    unit_generation_start_date: datetime = Field(..., example='2023-12-28T22:18:29.823000')
    unit_generation_end_date: datetime = Field(..., example='2024-12-28T22:18:29.823000')
    sustainable_development_goals: list[SustainableDevelopmentGoalResponse]
    circularity: str
    unit_types_generated: dict[str, int] = None
    total_unit_count: int = None
    company_id: UUID
    image_uri: str = None
    image_blurhash: str = None
    image_aspect_ratio: float = None
    created_at: datetime = Field(..., example='2021-12-28T22:18:29.823000')
