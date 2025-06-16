from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class UpdateTransactionRequest(BasePydanticModel):
    transaction_status_id: UUID
