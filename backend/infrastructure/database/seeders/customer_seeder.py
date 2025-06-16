from domain.entities import User, Customer, Company, CompanyAddress, Role, UserRole
from domain.enums.role_enum import Roles
from infrastructure.database.db import db


def seed_customers():
    seed_customer_1()
    seed_customer_2()
    db.session.commit()


def seed_customer_1():
    company = Company(
        id='00000000-0000-0000-0000-000000000001',
        name='Company 1',
        NIP='1111111111',
        REGON='111111111',
        KRS='1111111111',
        representatives=['Customer 1']
    )

    company_address = CompanyAddress(
        id='00000000-0000-0000-0000-000000000001',
        street='Street 1',
        city='City 1',
        postal_code='11-111',
        company_id=company.id
    )

    user_1 = User(
        id='00000000-0000-0000-0000-000000000003',
        email='customer1',
        password='$2a$12$g1NtVJ9H.fF/W6PU0uxBkuee7qR9O/cHwl/w4wjFbgXwXyxsZ0zK6',  # customer1
        first_name='Customer',
        last_name='1',
        is_active=True
    )

    user_1_role = UserRole(
        id='00000000-0000-0000-0000-000000000003',
        user_id=user_1.id,
        role_id=Role.query.filter_by(name=Roles.CUSTOMER).first().id
    )

    customer_1 = Customer(
        id='00000000-0000-0000-0000-000000000001',
        phone_number='0000000001',
        identity_card_number='0000000001',
        user_id=user_1.id,
        company_id=company.id
    )

    db.session.merge(company)
    db.session.merge(company_address)
    db.session.merge(user_1)
    db.session.merge(user_1_role)
    db.session.merge(customer_1)


def seed_customer_2():
    company = Company(
        id='00000000-0000-0000-0000-000000000002',
        name='Company 2',
        NIP='2222222222',
        REGON='222222222',
        KRS='2222222222',
        representatives=['Customer 2']
    )

    company_address = CompanyAddress(
        id='00000000-0000-0000-0000-000000000002',
        street='Street 2',
        city='City 2',
        postal_code='22-222',
        company_id=company.id
    )

    user_2 = User(
        id='00000000-0000-0000-0000-000000000004',
        email='customer2',
        password='$2a$12$fSGZr8hof/I2G4tQFA1hlO97sWx/VKtgwT1qhfRasKSul/qp8NbZq',  # customer2
        first_name='Customer',
        last_name='2',
        is_active=True
    )

    user_2_role = UserRole(
        id='00000000-0000-0000-0000-000000000004',
        user_id=user_2.id,
        role_id=Role.query.filter_by(name=Roles.CUSTOMER).first().id
    )

    customer_2 = Customer(
        id='00000000-0000-0000-0000-000000000002',
        phone_number='0000000002',
        identity_card_number='0000000002',
        user_id=user_2.id,
        company_id=company.id
    )

    db.session.merge(company)
    db.session.merge(company_address)
    db.session.merge(user_2)
    db.session.merge(user_2_role)
    db.session.merge(customer_2)
