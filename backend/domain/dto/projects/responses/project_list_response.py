from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.projects.responses.project_response import ProjectResponse


class ProjectListResponse(BasePydanticModel):
    __root__: list[ProjectResponse]
