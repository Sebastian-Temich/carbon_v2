from pydantic import BaseModel

from domain.utils.snake_to_camel import snake_to_camel


class BasePydanticModel(BaseModel):
    class Config:
        orm_mode = True
        alias_generator = snake_to_camel
        allow_population_by_field_name = True

    def dict(self, *args, **kwargs):
        result = super().dict(by_alias=True)
        return result
