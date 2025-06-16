from automapper import mapper
from flask import jsonify

from domain.dto.country.responses.country_response import CountryResponse
from domain.entities.country import Country


def handle_get_countries():
    country_responses = []
    for country in Country.query.order_by(Country.id).all():
        country_response = mapper.to(CountryResponse).map(country)
        country_responses.append(country_response.dict())

    response = jsonify(country_responses)
    return response, 200
