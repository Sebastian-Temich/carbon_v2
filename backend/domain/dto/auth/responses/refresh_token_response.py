from domain.dto.base_pydantic_model import BasePydanticModel


class RefreshTokenResponse(BasePydanticModel):
    message: str
