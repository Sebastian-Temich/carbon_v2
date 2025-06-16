from uuid import UUID

from domain.entities import Offset, OffsetLog
from domain.enums.offset_log_actions import OffsetLogActions
from infrastructure.database.db import db


class OffsetLogService:
    @staticmethod
    def add_offset_log(source_offset_id: UUID,
                       target_offset_id: UUID,
                       company_id: UUID,
                       action: type[OffsetLogActions],
                       commit: bool = True) -> None:
        target_offset = Offset.query.get(target_offset_id)

        unit_log = OffsetLog(
            unit_price=target_offset.unit_price,
            unit_count=target_offset.unit_count,
            action=action,
            source_offset_id=source_offset_id,
            target_offset_id=target_offset_id,
            company_id=company_id,
        )
        db.session.add(unit_log)
        if commit:
            db.session.commit()
