from application.controllers.app import app_bp
from application.controllers.auth import auth_bp
from application.controllers.country import countries_bp
from application.controllers.currency import currencies_bp
from application.controllers.offset import offsets_bp
from application.controllers.offset_audit_unit import offset_audit_units_bp
from application.controllers.offset_log import offset_logs_bp
from application.controllers.offset_status import offset_statuses_bp
from application.controllers.offset_unit_type import offset_unit_types_bp
from application.controllers.project import projects_bp
from application.controllers.project_standard import project_standards_bp
from application.controllers.role import roles_bp
from application.controllers.sustainable_development_goal import sdg_bp
from application.controllers.transaction import transactions_bp
from application.controllers.transaction_status import transaction_statuses_bp
from application.controllers.user import users_bp


def setup_swagger(flask_app):
    flask_app.register_api(app_bp)
    flask_app.register_api(auth_bp)
    flask_app.register_api(countries_bp)
    flask_app.register_api(currencies_bp)
    flask_app.register_api(offset_audit_units_bp)
    flask_app.register_api(offset_logs_bp)
    flask_app.register_api(offset_statuses_bp)
    flask_app.register_api(offset_unit_types_bp)
    flask_app.register_api(offsets_bp)
    flask_app.register_api(project_standards_bp)
    flask_app.register_api(projects_bp)
    flask_app.register_api(roles_bp)
    flask_app.register_api(sdg_bp)
    flask_app.register_api(transaction_statuses_bp)
    flask_app.register_api(transactions_bp)
    flask_app.register_api(users_bp)
