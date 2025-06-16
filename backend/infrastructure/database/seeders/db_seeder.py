from infrastructure.database.seeders.country_seeder import seed_countries
from infrastructure.database.seeders.currency_seeder import seed_currencies
from infrastructure.database.seeders.customer_seeder import seed_customers
from infrastructure.database.seeders.offset_audit_unit_seeder import seed_offset_audit_units
from infrastructure.database.seeders.offset_status_seeder import seed_offset_statuses
from infrastructure.database.seeders.offset_unit_type_seeder import seed_offset_unit_types
from infrastructure.database.seeders.project_standard_seeder import seed_project_standards
from infrastructure.database.seeders.role_seeder import seed_roles
from infrastructure.database.seeders.sdg_seeder import seed_sustainable_development_goals
from infrastructure.database.seeders.transaction_status_seeder import seed_transaction_statuses
from infrastructure.database.seeders.user_seeder import seed_users


def seed_database(app):
    with app.app_context():
        seed_roles()
        seed_users()
        seed_sustainable_development_goals()
        seed_countries()
        seed_project_standards()
        seed_offset_unit_types()
        seed_offset_audit_units()
        seed_currencies()
        seed_offset_statuses()
        seed_customers()
        seed_transaction_statuses()
