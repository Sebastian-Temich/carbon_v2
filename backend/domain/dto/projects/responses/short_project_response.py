from datetime import datetime
from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.country.responses.country_response import CountryResponse
from domain.dto.project_standard.responses.project_standard_response import ProjectStandardResponse
from domain.dto.sustainable_development_goals.responses.software_development_goal_response import \
    SustainableDevelopmentGoalResponse


class ShortProjectResponse(BasePydanticModel):
    id: UUID
    name: str = Field(..., example='Project name')
    country: CountryResponse
    project_standard: ProjectStandardResponse
    sustainable_development_goals: list[SustainableDevelopmentGoalResponse]
    created_at: datetime = Field(..., example='2023-12-28T22:18:29.823000')
