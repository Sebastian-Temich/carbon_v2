from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.transaction_status.responses.transaction_status_response import TransactionStatusResponse


class TransactionStatusListResponse(BasePydanticModel):
    __root__: list[TransactionStatusResponse]
