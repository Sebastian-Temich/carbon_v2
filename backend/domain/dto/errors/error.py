from domain.dto.base_pydantic_model import BasePydanticModel


class ErrorResponse(BasePydanticModel):
    code: int
    name: str
    description: str
