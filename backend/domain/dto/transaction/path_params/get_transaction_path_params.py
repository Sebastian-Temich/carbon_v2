from uuid import UUID

from domain.dto.base_pydantic_model import BasePydanticModel


class GetTransactionPathParams(BasePydanticModel):
    transaction_id: UUID
