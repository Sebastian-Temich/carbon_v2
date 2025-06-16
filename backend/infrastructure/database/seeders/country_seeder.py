from uuid import UUID

import requests

from domain.entities.country import Country
from infrastructure.database.db import db
from infrastructure.mapping.object_storage_path_resolver import ObjectStoragePathResolver


# ORIGINAL CODE - COMMENTED OUT FOR S3 MOCK
# def fetch_countries_from_api():
#     country_uri = ObjectStoragePathResolver.get_path_in_root('countries.json')
#     response = requests.get(country_uri)
#     response.raise_for_status()
#     country_data = response.json()
#     return country_data

# MOCK VERSION - REMOVE WHEN S3 IS AVAILABLE
def fetch_countries_from_api():
    """
    Mock function that returns hardcoded country data instead of fetching from S3.
    This replaces the S3 API call to allow backend to start without S3 connection.
    """
    return [
        {'alpha-3': 'USA', 'name': 'United States of America'},
        {'alpha-3': 'GBR', 'name': 'United Kingdom'},
        {'alpha-3': 'DEU', 'name': 'Germany'},
        {'alpha-3': 'FRA', 'name': 'France'},
        {'alpha-3': 'ITA', 'name': 'Italy'},
        {'alpha-3': 'ESP', 'name': 'Spain'},
        {'alpha-3': 'POL', 'name': 'Poland'},
        {'alpha-3': 'NLD', 'name': 'Netherlands'},
        {'alpha-3': 'BEL', 'name': 'Belgium'},
        {'alpha-3': 'CHE', 'name': 'Switzerland'},
        {'alpha-3': 'AUT', 'name': 'Austria'},
        {'alpha-3': 'CZE', 'name': 'Czech Republic'},
        {'alpha-3': 'SVK', 'name': 'Slovakia'},
        {'alpha-3': 'HUN', 'name': 'Hungary'},
        {'alpha-3': 'ROU', 'name': 'Romania'},
        {'alpha-3': 'BGR', 'name': 'Bulgaria'},
        {'alpha-3': 'GRC', 'name': 'Greece'},
        {'alpha-3': 'PRT', 'name': 'Portugal'},
        {'alpha-3': 'IRL', 'name': 'Ireland'},
        {'alpha-3': 'DNK', 'name': 'Denmark'},
        {'alpha-3': 'SWE', 'name': 'Sweden'},
        {'alpha-3': 'NOR', 'name': 'Norway'},
        {'alpha-3': 'FIN', 'name': 'Finland'},
        {'alpha-3': 'ISL', 'name': 'Iceland'},
        {'alpha-3': 'CAN', 'name': 'Canada'},
        {'alpha-3': 'MEX', 'name': 'Mexico'},
        {'alpha-3': 'BRA', 'name': 'Brazil'},
        {'alpha-3': 'ARG', 'name': 'Argentina'},
        {'alpha-3': 'CHL', 'name': 'Chile'},
        {'alpha-3': 'COL', 'name': 'Colombia'},
        {'alpha-3': 'PER', 'name': 'Peru'},
        {'alpha-3': 'VEN', 'name': 'Venezuela'},
        {'alpha-3': 'URY', 'name': 'Uruguay'},
        {'alpha-3': 'PRY', 'name': 'Paraguay'},
        {'alpha-3': 'BOL', 'name': 'Bolivia'},
        {'alpha-3': 'ECU', 'name': 'Ecuador'},
        {'alpha-3': 'GUY', 'name': 'Guyana'},
        {'alpha-3': 'SUR', 'name': 'Suriname'},
        {'alpha-3': 'JPN', 'name': 'Japan'},
        {'alpha-3': 'CHN', 'name': 'China'},
        {'alpha-3': 'IND', 'name': 'India'},
        {'alpha-3': 'KOR', 'name': 'South Korea'},
        {'alpha-3': 'THA', 'name': 'Thailand'},
        {'alpha-3': 'VNM', 'name': 'Vietnam'},
        {'alpha-3': 'SGP', 'name': 'Singapore'},
        {'alpha-3': 'MYS', 'name': 'Malaysia'},
        {'alpha-3': 'IDN', 'name': 'Indonesia'},
        {'alpha-3': 'PHL', 'name': 'Philippines'},
        {'alpha-3': 'AUS', 'name': 'Australia'},
        {'alpha-3': 'NZL', 'name': 'New Zealand'},
        {'alpha-3': 'ZAF', 'name': 'South Africa'},
        {'alpha-3': 'EGY', 'name': 'Egypt'},
        {'alpha-3': 'MAR', 'name': 'Morocco'},
        {'alpha-3': 'NGA', 'name': 'Nigeria'},
        {'alpha-3': 'KEN', 'name': 'Kenya'},
        {'alpha-3': 'GHA', 'name': 'Ghana'},
        {'alpha-3': 'ETH', 'name': 'Ethiopia'},
        {'alpha-3': 'TZA', 'name': 'Tanzania'},
        {'alpha-3': 'UGA', 'name': 'Uganda'},
        {'alpha-3': 'RWA', 'name': 'Rwanda'},
        {'alpha-3': 'RUS', 'name': 'Russia'},
        {'alpha-3': 'UKR', 'name': 'Ukraine'},
        {'alpha-3': 'BLR', 'name': 'Belarus'},
        {'alpha-3': 'LTU', 'name': 'Lithuania'},
        {'alpha-3': 'LVA', 'name': 'Latvia'},
        {'alpha-3': 'EST', 'name': 'Estonia'},
        {'alpha-3': 'TUR', 'name': 'Turkey'},
        {'alpha-3': 'ISR', 'name': 'Israel'},
        {'alpha-3': 'SAU', 'name': 'Saudi Arabia'},
        {'alpha-3': 'ARE', 'name': 'United Arab Emirates'},
        {'alpha-3': 'QAT', 'name': 'Qatar'},
        {'alpha-3': 'KWT', 'name': 'Kuwait'},
        {'alpha-3': 'BHR', 'name': 'Bahrain'},
        {'alpha-3': 'OMN', 'name': 'Oman'},
        {'alpha-3': 'JOR', 'name': 'Jordan'},
        {'alpha-3': 'LBN', 'name': 'Lebanon'},
        {'alpha-3': 'IRN', 'name': 'Iran'},
        {'alpha-3': 'IRQ', 'name': 'Iraq'},
        {'alpha-3': 'AFG', 'name': 'Afghanistan'},
        {'alpha-3': 'PAK', 'name': 'Pakistan'},
        {'alpha-3': 'BGD', 'name': 'Bangladesh'},
        {'alpha-3': 'LKA', 'name': 'Sri Lanka'},
        {'alpha-3': 'NPL', 'name': 'Nepal'},
        {'alpha-3': 'BTN', 'name': 'Bhutan'},
        {'alpha-3': 'MDV', 'name': 'Maldives'}
    ]


def seed_countries():
    if Country.query.count() > 0:
        return

    countries_data = fetch_countries_from_api()
    countries = []
    for index, country_data in enumerate(countries_data):
        country = Country(id=UUID(int=index + 1), alpha3_code=country_data['alpha-3'], name=country_data['name'])
        countries.append(country)

    for country in countries:
        db.session.merge(country)

    db.session.commit()
