from domain.entities import OffsetUnitType
from infrastructure.database.db import db


def seed_offset_unit_types():
    offset_unit_types = [
        OffsetUnitType(id='00000000-0000-0000-0000-000000000001', name='VER'),
        OffsetUnitType(id='00000000-0000-0000-0000-000000000002', name='CER'),
        OffsetUnitType(id='00000000-0000-0000-0000-000000000003', name='ERU'),
        OffsetUnitType(id='00000000-0000-0000-0000-000000000004', name='EUA'),
        OffsetUnitType(id='00000000-0000-0000-0000-000000000005', name='VCS'),
        OffsetUnitType(id='00000000-0000-0000-0000-000000000006', name='GS'),
        OffsetUnitType(id='00000000-0000-0000-0000-000000000007', name='VOS'),
        OffsetUnitType(id='00000000-0000-0000-0000-000000000008', name='CCBS')
    ]
    for offset_unit_type in offset_unit_types:
        db.session.merge(offset_unit_type)

    db.session.commit()
