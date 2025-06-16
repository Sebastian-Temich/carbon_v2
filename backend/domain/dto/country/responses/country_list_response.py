from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.country.responses.country_response import CountryResponse


class CountryListResponse(BasePydanticModel):
    __root__: list[CountryResponse]
