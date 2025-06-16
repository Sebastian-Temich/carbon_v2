from flask_openapi3 import Tag, APIBlueprint

from application.controllers.country.get_countries_handler import handle_get_countries
from domain.dto.country.responses.country_list_response import CountryListResponse

countries_tag = Tag(name='Countries')
countries_bp = APIBlueprint('Countries', __name__, url_prefix='/countries', abp_tags=[countries_tag])


@countries_bp.get('', responses={'200': CountryListResponse})
def get_countries():
    """
    Returns a list of countries.
    """
    return handle_get_countries()
