from domain.entities.project_standard import ProjectStandard
from infrastructure.database.db import db


def seed_project_standards():
    project_standards = [
        ProjectStandard(id='00000000-0000-0000-0000-000000000001', name='Gold Standard'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000002', name='Verra'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000003', name='ACR - American Carbon Registry'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000004', name='CAR - Climate Action Registry'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000005', name='Impacts Place Standard (IPS)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000006', name='ISO 14064 (ISO)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000007', name='Verified Carbon Standard (VCS)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000008', name='Gold Standard (GS)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000009', name='Climate, Community & Biodiversity Standards (CCB)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000010', name='American Carbon Registry (ACR)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000011', name='Plan Vivo Standard (PVS)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000012', name='Social Carbon (SC)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000013', name='Climate Action Reserve (CAR)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000014', name='Global Carbon Council (GCC)'),
        ProjectStandard(id='00000000-0000-0000-0000-000000000015', name='Clean Development Mechanism (CDM)')
    ]
    for project_standard in project_standards:
        db.session.merge(project_standard)

    db.session.commit()
