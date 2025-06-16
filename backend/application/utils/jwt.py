from functools import wraps

from flask import abort
from flask_jwt_extended import JWTManager, verify_jwt_in_request, get_jwt

from domain.entities.user import User
from domain.enums.api_error_code_enum import ApiErrorCodes

jwt = JWTManager()
security = [{'cookieAuth': []}]


@jwt.user_lookup_loader
def user_loader_callback(_, payload) -> User:
    user_id = payload['sub']
    user = User.query.filter_by(id=user_id).first()
    if user is None:
        return abort(401, "User not found")
    return user


@jwt.user_identity_loader
def user_identity_lookup(user: User):
    return user.id


@jwt.additional_claims_loader
def add_claims_to_access_token(user: User):
    return {
        'roles': [role.name for role in user.roles]
    }


def authorize(roles: list[str] | None = None):
    if roles is None:
        roles = []
    roles = [role.upper() for role in roles]

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            verify_jwt_in_request()
            payload = get_jwt()
            user_roles = payload['roles']
            if roles and not set(roles).intersection(user_roles):
                return abort(403, ApiErrorCodes.RESOURCE_FORBIDDEN)

            return f(*args, **kwargs)

        return wrapper

    return decorator
