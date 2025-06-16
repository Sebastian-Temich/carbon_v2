from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class SustainableDevelopmentGoalResponse(BasePydanticModel):
    id: UUID
    name: str
    image_uri: str = Field(..., example=f'https://domain.com/sdg/sdg-XX.png')
