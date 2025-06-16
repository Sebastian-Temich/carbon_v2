from automapper import mapper
from flask import jsonify

from domain.dto.currency.responses.currency_response import CurrencyResponse
from domain.entities import Currency


def handle_get_currencies():
    currency_responses = []
    for currency in Currency.query.order_by(Currency.id).all():
        country_response = mapper.to(CurrencyResponse).map(currency)
        currency_responses.append(country_response.dict())

    response = jsonify(currency_responses)
    return response, 200
