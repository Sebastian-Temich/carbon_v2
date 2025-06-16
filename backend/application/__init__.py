from flask_cors import CORS
from flask_openapi3 import Info, OpenAPI

from application.config import Config
from application.error_handlers import error_handlers
from application.utils.bcrypt import bcrypt
from application.utils.json_utils import CustomJSONProvider
from infrastructure.database.db import db


def create_app(cfg: type[Config]):
    info = Info(
        title="Carbon API",
        version="1.0.0",
        description="To use endpoints marked with a padlock, you need to have a valid JWT token in a cookie.\n\n"
                    f"Pagination page limit is set to {cfg.PAGINATION_LIMIT}.\n\n"
                    "Pagination metadata is returned in the X-Pagination header.\n\n"
    )
    app = OpenAPI(__name__, info=info)
    app.config.from_object(cfg)
    app.json = CustomJSONProvider(app)

    CORS(app, supports_credentials=True, origins=cfg.CORS_ORIGINS)

    db.init_app(app)
    db.app = app

    from infrastructure.database.seeders.db_seeder import seed_database
    seed_database(app)

    from application.utils.jwt import jwt
    jwt.init_app(app)
    bcrypt.init_app(app)

    from infrastructure.mapping.auto_mapper import register_automapper_profiles
    register_automapper_profiles()
    app.register_blueprint(error_handlers)

    return app
