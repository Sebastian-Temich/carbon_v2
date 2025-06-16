from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.currency.responses.currency_response import CurrencyResponse


class CurrencyListResponse(BasePydanticModel):
    __root__: list[CurrencyResponse]
