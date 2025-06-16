from flask_openapi3 import APIBlueprint, Tag

from application.controllers.sustainable_development_goal.get_sustainable_development_goals_handler import \
    handle_get_sustainable_development_goals
from domain.dto.sustainable_development_goals.responses.software_development_goal_list_response import \
    SustainableDevelopmentGoalListResponse

sdg_tag = Tag(name='Sustainable Development Goals')
sdg_bp = APIBlueprint('Sustainable Development Goals', __name__,
                      url_prefix='/sustainable-development-goals', abp_tags=[sdg_tag])


@sdg_bp.get('', responses={'200': SustainableDevelopmentGoalListResponse})
def get_sustainable_development_goals():
    """
    Returns all sustainable development goals.
    """
    return handle_get_sustainable_development_goals()
