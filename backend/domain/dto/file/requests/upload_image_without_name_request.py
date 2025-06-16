from pydantic import validator

from domain.dto.file.requests.upload_file_without_name_request import UploadFileWithoutNameRequest
from domain.enums.api_error_code_enum import ApiErrorCodes


class UploadImageWithoutNameRequest(UploadFileWithoutNameRequest):
    @validator('content_type')
    def content_type_must_be_valid(cls, v: str):
        valid_content_types = ['image/png', 'image/jpg', 'image/jpeg']
        if v not in valid_content_types:
            raise ValueError(ApiErrorCodes.FILE_TYPE_NOT_SUPPORTED)
        return v
