from pydantic import validator

from application.config import Config
from domain.dto.base_pydantic_model import BasePydanticModel


class PaginationParams(BasePydanticModel):
    page: int = 1
    per_page: int = 10

    @validator('page')
    def page_not_less_than_1(cls, v):
        if v < 1:
            raise ValueError('page cannot be less than 1')
        return v

    @validator('per_page')
    def per_page_not_greater_than_limit(cls, v):
        if v > Config.PAGINATION_LIMIT:
            raise ValueError(f'per_page cannot be greater than {Config.PAGINATION_LIMIT}')
        return v

    @validator('per_page')
    def per_page_not_less_than_1(cls, v):
        if v < 1:
            raise ValueError('per_page cannot be less than 1')
        return v
