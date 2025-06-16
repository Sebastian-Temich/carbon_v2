from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.project_standard.responses.project_standard_response import ProjectStandardResponse


class ProjectStandardListResponse(BasePydanticModel):
    __root__: list[ProjectStandardResponse]
