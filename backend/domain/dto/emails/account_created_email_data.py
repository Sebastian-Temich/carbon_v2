from domain.dto.base_pydantic_model import BasePydanticModel


class AccountCreatedEmailData(BasePydanticModel):
    email: str
    password: str
