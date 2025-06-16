from uuid import UUID

from flask import abort, jsonify, Response
from flask_jwt_extended import get_current_user

from application import Config
from application.services.blurhash_service import BlurHashService
from application.services.image_service import ImageService
from application.services.object_storage_service import ObjectStorageService
from application.services.project_service import ProjectService
from domain.dto.file.requests.upload_image_without_name_request import UploadImageWithoutNameRequest
from domain.dto.project_standard.requests.assign_project_standard_request import AssignProjectStandardRequest
from domain.dto.projects.requests.update_project_request import UpdateProjectRequest
from domain.entities import Project, OffsetStatus, Offset, Country, SustainableDevelopmentGoal
from domain.enums.offset_status_enum import OffsetStatuses
from domain.enums.role_enum import Roles
from infrastructure.database.db import db


def handle_update_project(project_id: UUID, body: UpdateProjectRequest) -> tuple[Response, int]:
    if not body.__fields_set__:
        abort(400, 'No fields to update')

    project = Project.query.filter_by(id=project_id).first()
    if not project:
        abort(404, 'Project not found')

    current_user = get_current_user()
    user_roles = [role.name for role in current_user.roles]

    if Roles.CUSTOMER in user_roles and project.company_id == current_user.customer.company_id:
        update_fields_by_customer(project, body)
        set_project_offset_statuses_to_pending(project)
    else:
        abort(403, 'You are not allowed to update this project')

    project_response = ProjectService.get_project_response(project)
    response = jsonify(project_response.dict())
    db.session.commit()
    return response, 200


def set_project_offset_statuses_to_pending(project: Project) -> None:
    pending_status = OffsetStatus.query.filter_by(name=OffsetStatuses.PENDING).first()
    accepted_status = OffsetStatus.query.filter_by(name=OffsetStatuses.ACCEPTED).first()
    Offset.query \
        .filter_by(project_id=project.id) \
        .filter(Offset.offset_status_id == accepted_status.id) \
        .filter(Offset.owned_by_company_id == project.company_id) \
        .update({Offset.offset_status_id: pending_status.id}, synchronize_session=False)


def update_fields_by_customer(project: Project, body: UpdateProjectRequest) -> None:
    if 'name' in body.__fields_set__:
        project.name = body.name

    if 'description' in body.__fields_set__:
        project.description = body.description

    if 'address' in body.__fields_set__:
        project.address = body.address

    if 'country_id' in body.__fields_set__:
        country = Country.query.filter_by(id=body.country_id).first()
        project.country = country

    if 'start_date' in body.__fields_set__:
        project.start_date = body.start_date

    if 'expected_end_date' in body.__fields_set__:
        project.expected_end_date = body.expected_end_date

    if 'unit_generation_start_date' in body.__fields_set__:
        project.unit_generation_start_date = body.unit_generation_start_date

    if 'unit_generation_end_date' in body.__fields_set__:
        project.unit_generation_end_date = body.unit_generation_end_date

    if 'circularity' in body.__fields_set__:
        project.circularity = body.circularity

    if 'sustainable_development_goal_ids' in body.__fields_set__:
        update_sustainable_development_goals(project, body.sustainable_development_goal_ids)

    if 'project_standard' in body.__fields_set__:
        update_project_standard(project, body.project_standard)

    if 'image' in body.__fields_set__:
        update_project_image(project, body.image)


def update_project_image(project: Project, image_request: UploadImageWithoutNameRequest) -> None:
    if project.image_uri:
        ObjectStorageService.delete_object_from_bucket(project.image_uri, Config.BUCKET_PROJECT_IMAGES_FOLDER)

    if image_request is None:
        project.image_uri = None
        project.image_blurhash = None
        project.image_aspect_ratio = None
        return

    image_uri = ProjectService.upload_project_image(image_request)
    project.image_uri = image_uri

    image = ImageService.base64_to_image(image_request.content_as_base64)
    project.image_blurhash = BlurHashService.encode_image(image)
    project.image_aspect_ratio = ImageService.get_image_aspect_ratio(image)


def update_project_standard(project: Project, assign_project_standard_request: AssignProjectStandardRequest) -> None:
    project_standard = ProjectService.create_or_get_project_standard(assign_project_standard_request)
    project.project_standard = project_standard


def update_sustainable_development_goals(project: Project, sustainable_development_goal_ids: list[UUID]) -> None:
    project.sustainable_development_goals = []
    for sustainable_development_goal_id in sustainable_development_goal_ids:
        sustainable_development_goal = SustainableDevelopmentGoal.query \
            .filter_by(id=sustainable_development_goal_id) \
            .first()
        if not sustainable_development_goal:
            abort(404, 'Sustainable development goal not found')
        project.sustainable_development_goals.append(sustainable_development_goal)
