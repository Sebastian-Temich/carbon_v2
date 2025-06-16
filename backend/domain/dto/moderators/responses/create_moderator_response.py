from domain.dto.base_pydantic_model import BasePydanticModel


class CreateModeratorResponse(BasePydanticModel):
    password: str
