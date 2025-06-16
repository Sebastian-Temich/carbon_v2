from application import Config


class ObjectStoragePathResolver:
    @staticmethod
    def get_path_in_root(file_name: str) -> str:
        return f'{Config.BUCKET_ENDPOINT}/{file_name}'

    @staticmethod
    def get_sdg_image_path(sdg_image_uri: str) -> str:
        return f'{Config.BUCKET_ENDPOINT}/{Config.BUCKET_SDG_FOLDER}/{sdg_image_uri}'

    @staticmethod
    def get_project_image_path(project_image_uri: str) -> str:
        return f'{Config.BUCKET_ENDPOINT}/{Config.BUCKET_PROJECT_IMAGES_FOLDER}/{project_image_uri}'
