from automapper import mapper
from flask import jsonify

from application.config import Config
from application.utils.pagination import set_pagination_metadata
from domain.dto.query_params.user_query import UserQuery
from domain.dto.users.responses.user_list_response import UserListResponseItem
from domain.entities.role import Role
from domain.entities.user import User


def handle_get_users(query: UserQuery):
    users = User.query.join(User.moderator, isouter=True)

    if query.role:
        users = users.filter(User.roles.any(Role.name.ilike(query.role)))

    users = users.paginate(page=query.page, per_page=query.per_page, max_per_page=Config.PAGINATION_LIMIT)

    user_responses = []
    for user in users:
        user_response = mapper.to(UserListResponseItem).map(user)
        user_responses.append(user_response.dict())

    response = jsonify(user_responses)
    set_pagination_metadata(response, users)
    return response, 200
