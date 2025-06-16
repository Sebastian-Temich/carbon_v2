from uuid import UUID

from pydantic import validator

from domain.dto.query_params.pagination_params import PaginationParams
from domain.entities import TransactionStatus


class TransactionQuery(PaginationParams):
    transaction_status_ids: list[UUID] = None

    @validator('transaction_status_ids')
    def transaction_status_ids_exist(cls, v):
        if v:
            transaction_statuses = TransactionStatus.query.filter(TransactionStatus.id.in_(v)).all()
            if len(transaction_statuses) != len(v):
                raise ValueError('One or more transaction statuses do not exist')
        return v
