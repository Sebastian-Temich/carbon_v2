from domain.dto.base_pydantic_model import BasePydanticModel


class PaginationMetadata(BasePydanticModel):
    page: int
    per_page: int
    total_pages: int
    total_count: int
