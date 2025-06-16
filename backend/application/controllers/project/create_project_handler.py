import os
import uuid
from typing import Optional
from uuid import UUID

from flask import jsonify
from flask_jwt_extended import get_current_user

from application.config import Config
from application.services.blurhash_service import BlurHashService
from application.services.image_service import ImageService
from application.services.object_storage_service import ObjectStorageService
from application.services.project_service import ProjectService
from application.utils.sendgrid import sendgrid
from domain.dto.projects.requests.create_project_request import CreateProjectRequest
from domain.entities import ProjectSustainableDevelopmentGoal, Project, Country, User
from infrastructure.database.db import db
from send_grid.dto.single_email_dto import SingleEmailDto


def handle_create_project(body: CreateProjectRequest):
    current_user = get_current_user()
    img_file_name = ProjectService.upload_project_image(body.image)

    try:
        project = create_project(
            body=body,
            company_id=current_user.customer.company_id,
            image_uri=img_file_name
        )
        db.session.flush()
        create_project_goals(sdg_ids=body.sustainable_development_goal_ids, project_id=project.id)
        db.session.commit()
    except Exception as e:
        db.session.rollback()
        if img_file_name:
            ObjectStorageService.delete_object_from_bucket(
                file_name=img_file_name,
                folder=Config.BUCKET_PROJECT_IMAGES_FOLDER
            )
        raise e

    send_project_created_email(user=current_user)
    project_response = ProjectService.get_project_response(project)
    response = jsonify(project_response.dict())

    return response, 201


def create_project(body: CreateProjectRequest, company_id: UUID, image_uri: Optional[str]) -> Project:
    country = Country.query.get(body.country_id)
    project_standard = ProjectService.create_or_get_project_standard(body.project_standard)

    project = Project(
        id=uuid.uuid4(),
        name=body.name,
        description=body.description,
        address=body.address,
        start_date=body.start_date,
        expected_end_date=body.expected_end_date,
        unit_generation_start_date=body.unit_generation_start_date,
        unit_generation_end_date=body.unit_generation_end_date,
        circularity=body.circularity,
        country=country,
        project_standard=project_standard,
        company_id=company_id,
        image_uri=image_uri
    )

    if body.image is not None:
        image = ImageService.base64_to_image(body.image.content_as_base64)
        project.image_blurhash = BlurHashService.encode_image(image)
        project.image_aspect_ratio = ImageService.get_image_aspect_ratio(image)

    db.session.add(project)
    return project


def create_project_goals(sdg_ids: list[UUID], project_id: UUID) -> list[ProjectSustainableDevelopmentGoal]:
    project_goals = []
    for sdg_id in sdg_ids:
        project_goal = ProjectSustainableDevelopmentGoal(project_id=project_id, sustainable_development_goal_id=sdg_id)
        project_goals.append(project_goal)

    db.session.add_all(project_goals)
    return project_goals


def send_project_created_email(user: User):
    email_data = SingleEmailDto(
        recipient_email=user.email,
        recipient_name=f"{user.first_name} {user.last_name}",
        template_id=Config.SENDGRID_TEMPLATE_PROJECT_CREATED
    )
    if os.getenv("DEBUG") == "True":
        print(email_data.__dict__)
    else:
        sendgrid.send_email(email_data)
