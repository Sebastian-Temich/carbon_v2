from domain.dto.base_pydantic_model import BasePydanticModel


class HealthCheckResponse(BasePydanticModel):
    code: str
