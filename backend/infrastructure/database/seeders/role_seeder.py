from domain.entities.role import Role
from domain.enums.role_enum import Roles
from infrastructure.database.db import db


def seed_roles():
    roles = [
        Role(id='00000000-0000-0000-0000-000000000001', name=Roles.ADMIN),
        Role(id='00000000-0000-0000-0000-000000000002', name=Roles.MODERATOR),
        Role(id='00000000-0000-0000-0000-000000000003', name=Roles.CUSTOMER)
    ]
    for role in roles:
        existing_role = Role.query.filter_by(id=role.id).first()
        if not existing_role:
            db.session.add(role)
    db.session.commit()
