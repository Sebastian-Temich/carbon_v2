from domain.dto.query_params.pagination_params import PaginationParams


class UserQuery(PaginationParams):
    role: str = None
