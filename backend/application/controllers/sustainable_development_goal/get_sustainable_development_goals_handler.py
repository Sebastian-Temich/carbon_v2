from automapper import mapper
from flask import jsonify

from application.config import Config
from domain.dto.sustainable_development_goals.responses.software_development_goal_response import \
    SustainableDevelopmentGoalResponse
from domain.entities.sustainable_development_goal import SustainableDevelopmentGoal


def handle_get_sustainable_development_goals():
    goal_responses = []
    bucket_endpoint = Config.BUCKET_ENDPOINT
    sdg_folder = Config.BUCKET_SDG_FOLDER

    for goal in SustainableDevelopmentGoal.query.order_by(SustainableDevelopmentGoal.id).all():
        goal_response = mapper.to(SustainableDevelopmentGoalResponse).map(goal)
        goal_response.image_uri = f'{bucket_endpoint}/{sdg_folder}/{goal_response.image_uri}'
        goal_responses.append(goal_response.dict())

    response = jsonify(goal_responses)
    return response, 200
