import base64

from pydantic import Field, validator

from domain.dto.base_pydantic_model import BasePydanticModel


class UploadFileWithoutNameRequest(BasePydanticModel):
    content_as_base64: str = Field(..., description='base64 encoded file content', example='Q2FyYm9uIHByb2plY3Q=')
    content_type: str = Field(..., description='file content type', example='image/png')

    @validator('content_as_base64')
    def image_must_be_base64_encoded(cls, v: str):
        try:
            base64.b64decode(v)
        except Exception:
            raise ValueError('Image must be base64 encoded')
        return v
