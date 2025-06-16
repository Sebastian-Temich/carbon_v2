import json

from flask import Response
from flask_sqlalchemy.pagination import Pagination

from domain.dto.headers.pagination_metadata import PaginationMetadata


def set_pagination_metadata(response: Response, pagination: Pagination):
    pagination_metadata = PaginationMetadata(
        page=pagination.page,
        per_page=pagination.per_page,
        total_pages=pagination.pages,
        total_count=pagination.total
    )
    response.headers['X-Pagination'] = json.dumps(pagination_metadata.dict())
    response.headers.add('Access-Control-Expose-Headers', 'X-Pagination')
