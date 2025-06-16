from flask_openapi3 import Tag, APIBlueprint

from application.controllers.currency.get_currencies_handler import handle_get_currencies
from domain.dto.currency.responses.currency_list_response import CurrencyListResponse

currencies_tag = Tag(name='Currencies')
currencies_bp = APIBlueprint('Currencies', __name__, url_prefix='/currencies', abp_tags=[currencies_tag])


@currencies_bp.get('', responses={'200': CurrencyListResponse})
def get_currencies():
    """
    Returns a list of currencies.
    """
    return handle_get_currencies()
