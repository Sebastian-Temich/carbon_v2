from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.sustainable_development_goals.responses.software_development_goal_response import \
    SustainableDevelopmentGoalResponse


class SustainableDevelopmentGoalListResponse(BasePydanticModel):
    __root__: list[SustainableDevelopmentGoalResponse]
