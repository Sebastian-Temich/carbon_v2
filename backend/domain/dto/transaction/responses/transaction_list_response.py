from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.transaction.responses.transaction_response import TransactionResponse


class TransactionListResponse(BasePydanticModel):
    __root__: list[TransactionResponse]
