from domain.dto.users.responses.user_response import UserResponse


class CreateCustomerUserResponse(UserResponse):
    password: str
