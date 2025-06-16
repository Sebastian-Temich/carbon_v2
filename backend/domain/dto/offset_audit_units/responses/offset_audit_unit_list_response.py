from domain.dto.base_pydantic_model import BasePydanticModel
from domain.dto.offset_audit_units.responses.offset_audit_unit_response import OffsetAuditUnitResponse


class OffsetAuditUnitListResponse(BasePydanticModel):
    __root__: list[OffsetAuditUnitResponse]
