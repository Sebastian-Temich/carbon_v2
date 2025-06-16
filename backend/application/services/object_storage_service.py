from botocore.exceptions import ClientError
from flask import abort

from application.utils.s3 import s3
from domain.enums.object_storage_access_type_enum import ObjectStorageAccessTypes


class ObjectStorageService:
    @staticmethod
    def put_object_in_bucket(
            file_name: str,
            folder: str,
            content: bytes,
            content_type: str,
            acl: ObjectStorageAccessTypes) -> bool:
        valid_acls = [value for key, value in ObjectStorageAccessTypes.__dict__.items() if not key.startswith('__')]
        if acl not in valid_acls:
            abort(500, f"Invalid ACL: {acl}")

        try:
            obj = s3.Object(folder, file_name)
            obj.put(Body=content, ContentType=content_type, ACL=acl)
            return True
        except ClientError as e:
            abort(500, "Error while uploading file : ", e)

    @staticmethod
    def delete_object_from_bucket(file_name: str, folder: str) -> bool:
        try:
            obj = s3.Object(folder, file_name)
            obj.delete()
            return True
        except ClientError as e:
            abort(500, "Error while deleting file : ", e)
