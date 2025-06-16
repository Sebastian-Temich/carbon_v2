from domain.entities import OffsetAuditUnit
from infrastructure.database.db import db


def seed_offset_audit_units():
    offset_audit_units = [
        OffsetAuditUnit(id='00000000-0000-0000-0000-000000000001', name='Audit Unit 1'),
        OffsetAuditUnit(id='00000000-0000-0000-0000-000000000002', name='Audit Unit 2'),
        OffsetAuditUnit(id='00000000-0000-0000-0000-000000000003', name='Audit Unit 3'),
    ]
    for offset_audit_unit in offset_audit_units:
        db.session.merge(offset_audit_unit)

    db.session.commit()
