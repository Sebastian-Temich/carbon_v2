from flask import Blueprint, jsonify
from werkzeug.exceptions import HTTPException

from domain.dto.errors.error import ErrorResponse

error_handlers = Blueprint('error_handlers', __name__)


@error_handlers.app_errorhandler(HTTPException)
def error_handler(error: HTTPException):
    response = jsonify(
        ErrorResponse(code=error.code, name=error.name, description=error.description).dict())
    return response, error.code
