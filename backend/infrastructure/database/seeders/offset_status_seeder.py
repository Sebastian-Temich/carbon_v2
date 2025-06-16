from domain.entities import OffsetStatus
from domain.enums.offset_status_enum import OffsetStatuses
from infrastructure.database.db import db


def seed_offset_statuses():
    offset_statuses = [
        OffsetStatus(id='00000000-0000-0000-0000-000000000001', name=OffsetStatuses.PENDING),
        OffsetStatus(id='00000000-0000-0000-0000-000000000002', name=OffsetStatuses.ACCEPTED),
        OffsetStatus(id='00000000-0000-0000-0000-000000000003', name=OffsetStatuses.REJECTED),
        OffsetStatus(id='00000000-0000-0000-0000-000000000004', name=OffsetStatuses.NOT_LISTED),
        OffsetStatus(id='00000000-0000-0000-0000-000000000005', name=OffsetStatuses.MARKETPLACE),
        OffsetStatus(id='00000000-0000-0000-0000-000000000006', name=OffsetStatuses.SOLD_OUT),
        OffsetStatus(id='00000000-0000-0000-0000-000000000007', name=OffsetStatuses.RETIRED),
    ]
    for offset_status in offset_statuses:
        db.session.merge(offset_status)

    db.session.commit()
