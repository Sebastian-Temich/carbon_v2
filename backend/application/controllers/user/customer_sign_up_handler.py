import uuid
from uuid import UUID

from automapper import mapper
from flask import jsonify

from application.services.user_service import create_user, send_account_created_email
from application.utils.password_generator import password_generator
from domain.dto.companies.requests.create_company_request import CreateCompanyRequest
from domain.dto.company_adresses.requests.create_company_address_request import CreateCompanyAddressRequest
from domain.dto.customers.requests.customer_sign_up_request import CustomerSignUpRequest
from domain.dto.customers.responses.create_customer_response import CreateCustomerUserResponse
from domain.dto.users.create_user_data import CreateUserData
from domain.entities.company import Company
from domain.entities.company_address import CompanyAddress
from domain.entities.customer import Customer
from domain.entities.role import Role
from domain.entities.user_role import UserRole
from domain.enums.role_enum import Roles
from infrastructure.database.db import db


def handle_customer_sign_up(request: CustomerSignUpRequest):
    password = password_generator.generate()
    user = create_user(CreateUserData(
        first_name=request.first_name,
        last_name=request.last_name,
        email=request.email,
        password=password
    ))
    db.session.add(user)

    user_role = UserRole(user_id=user.id, role_id=Role.query.filter_by(name=Roles.CUSTOMER).first().id)
    db.session.add(user_role)

    company = create_company(request.company)
    db.session.add(company)

    company_address = create_company_address(request.company.address, company.id)
    db.session.add(company_address)

    customer = create_customer(request, user.id, company.id)
    db.session.add(customer)

    create_customer_response = mapper.to(CreateCustomerUserResponse).map(user)
    create_customer_response.password = password
    response = jsonify(create_customer_response.dict())

    db.session.commit()
    send_account_created_email(user, password)

    return response, 201


def create_customer(request: CustomerSignUpRequest, user_id: UUID, company_id: UUID) -> Customer:
    phone_number = request.phone_number
    identity_card_number = request.identity_card_number
    customer = Customer(
        phone_number=phone_number,
        identity_card_number=identity_card_number,
        user_id=user_id,
        company_id=company_id
    )
    return customer


def create_company(request: CreateCompanyRequest) -> Company:
    company_name = request.name
    nip = request.NIP
    regon = request.REGON
    krs = request.KRS
    company_representatives = request.representatives
    company = Company(
        id=uuid.uuid4(),
        name=company_name,
        NIP=nip,
        REGON=regon,
        KRS=krs,
        representatives=company_representatives
    )
    return company


def create_company_address(request: CreateCompanyAddressRequest, company_id: UUID) -> CompanyAddress:
    street = request.street
    city = request.city
    postal_code = request.postal_code
    company_address = CompanyAddress(
        id=uuid.uuid4(),
        company_id=company_id,
        street=street,
        city=city,
        postal_code=postal_code
    )
    return company_address
