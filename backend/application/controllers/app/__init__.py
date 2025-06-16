from flask import jsonify
from flask_openapi3 import Tag, APIBlueprint

from domain.dto.app.responses.health_check_response import HealthCheckResponse

app_tag = Tag(name='App')
app_bp = APIBlueprint('App', __name__, url_prefix='/app', abp_tags=[app_tag])


@app_bp.get('/healthcheck', responses={'200': HealthCheckResponse})
def healthcheck():
    """
    Health check endpoint.
    """
    response = jsonify(HealthCheckResponse(code='OK').dict())
    return response, 200
