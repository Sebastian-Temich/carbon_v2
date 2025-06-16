from typing import Optional

from pydantic import EmailStr

from domain.dto.base_pydantic_model import BasePydanticModel


class CreateUserData(BasePydanticModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone: Optional[str]
    password: str
