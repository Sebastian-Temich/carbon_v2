from uuid import UUID

from pydantic import Field

from domain.dto.base_pydantic_model import BasePydanticModel


class TransactionStatusResponse(BasePydanticModel):
    id: UUID
    name: str = Field(..., example="STATUS_NAME")
