import os
import uuid

from application.config import Config
from application.utils.bcrypt import bcrypt
from application.utils.sendgrid import sendgrid
from domain.dto.emails.account_created_email_data import AccountCreatedEmailData
from domain.dto.users.create_user_data import CreateUserData
from domain.entities.user import User
from send_grid.dto.single_email_dto import SingleEmailDto


def create_user(user_data: CreateUserData) -> User:
    password_hash = bcrypt.generate_password_hash(user_data.password).decode("utf-8")
    user = User(
        id=uuid.uuid4(),
        email=user_data.email,
        password=password_hash,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        is_active=True
    )
    return user


def send_account_created_email(user: User, password: str):
    template_data = AccountCreatedEmailData(email=user.email, password=password)
    email_data = SingleEmailDto(
        recipient_email=user.email,
        recipient_name=f"{user.first_name} {user.last_name}",
        template_id=Config.SENDGRID_TEMPLATE_ACCOUNT_CREATED,
        template_data=template_data.dict()
    )
    if os.getenv("DEBUG") == "True":
        print(template_data.dict())
    else:
        sendgrid.send_email(email_data)
