from domain.entities.role import Role
from domain.entities.user import User
from domain.entities.user_role import UserRole
from domain.enums.role_enum import Roles
from infrastructure.database.db import db


def seed_users():
    admin_user = User(
        id='00000000-0000-0000-0000-000000000001',
        email='admin',
        password='$2a$12$l68tmyu.GtQeDuAcZdtZye1JMQ4b4Qnn.Ne7qbPYoEzvh2CWMoFgm',  # admin
        first_name='Admin',
        last_name='Admin',
        is_active=True
    )
    moderator_user = User(
        id='00000000-0000-0000-0000-000000000002',
        email='moderator',
        password='$2a$12$9DKL8Eutmpt.8BPEyFAxiucDswF0YtbeSj6kUcN0uwQEGmQVlajv2',  # moderator
        first_name='Moderator',
        last_name='Moderator',
        is_active=True
    )
    users = [admin_user, moderator_user]
    for user in users:
        db.session.merge(user)

    user_roles = [
        UserRole(
            id='00000000-0000-0000-0000-000000000001',
            user_id=admin_user.id,
            role_id=Role.query.filter_by(name=Roles.ADMIN).first().id
        ),
        UserRole(
            id='00000000-0000-0000-0000-000000000002',
            user_id=moderator_user.id,
            role_id=Role.query.filter_by(name=Roles.MODERATOR).first().id
        )
    ]
    for user_role in user_roles:
        db.session.merge(user_role)

    db.session.commit()
