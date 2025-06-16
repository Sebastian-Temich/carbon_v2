import base64
import uuid
from uuid import UUID

from automapper import mapper

from application import Config
from application.services.object_storage_service import ObjectStorageService
from domain.dto.file.requests.upload_image_without_name_request import UploadImageWithoutNameRequest
from domain.dto.project_standard.requests.assign_project_standard_request import AssignProjectStandardRequest
from domain.dto.projects.responses.project_response import ProjectResponse
from domain.dto.projects.responses.short_project_response import ShortProjectResponse
from domain.entities import Offset, Project, ProjectStandard
from domain.enums.object_storage_access_type_enum import ObjectStorageAccessTypes
from infrastructure.database.db import db
from infrastructure.mapping.object_storage_path_resolver import ObjectStoragePathResolver


class ProjectService:
    @staticmethod
    def get_project_response(project: Project) -> ProjectResponse:
        project_response = mapper.to(ProjectResponse).map(project)
        project_response.unit_types_generated = ProjectService.get_project_unit_type_count(project.id)
        project_response.total_unit_count = sum(project_response.unit_types_generated.values())

        if project.image_uri:
            project_response.image_uri = ObjectStoragePathResolver.get_project_image_path(project.image_uri)

        for sdg in project_response.sustainable_development_goals:
            sdg.image_uri = ObjectStoragePathResolver.get_sdg_image_path(sdg.image_uri)

        return project_response

    @staticmethod
    def get_short_project_response(project: Project) -> ShortProjectResponse:
        short_project_response = mapper.to(ShortProjectResponse).map(project)
        for sdg in short_project_response.sustainable_development_goals:
            sdg.image_uri = ObjectStoragePathResolver.get_sdg_image_path(sdg.image_uri)
        return short_project_response

    @staticmethod
    def get_project_unit_type_count(project_id: UUID) -> dict[str, int]:
        unit_type_count = {}
        for offset in Offset.query.filter_by(project_id=project_id):
            if offset.unit_type.name in unit_type_count:
                unit_type_count[offset.unit_type.name] += offset.unit_count
            else:
                unit_type_count[offset.unit_type.name] = offset.unit_count

        return unit_type_count

    @staticmethod
    def create_or_get_project_standard(request: AssignProjectStandardRequest) -> ProjectStandard:
        if request.existing_project_standard_id:
            return ProjectStandard.query.get(request.existing_project_standard_id)
        else:
            project_standard = ProjectStandard(
                id=uuid.uuid4(),
                name=request.new_project_standard_name
            )
            db.session.add(project_standard)
        return project_standard

    @staticmethod
    def upload_project_image(request: UploadImageWithoutNameRequest) -> str or None:
        if request is None:
            return None
        content_type = request.content_type
        content = base64.b64decode(request.content_as_base64)
        unique_id = uuid.uuid4().hex
        file_name = f'{unique_id}.{content_type.split("/")[1]}'
        ObjectStorageService.put_object_in_bucket(
            file_name=file_name,
            folder=Config.BUCKET_PROJECT_IMAGES_FOLDER,
            content=content,
            content_type=content_type,
            acl=ObjectStorageAccessTypes.PUBLIC_READ
        )
        return file_name
