from automapper import mapper

from domain.dto.companies.responses.company_response import CompanyResponse
from domain.dto.company_adresses.responses.company_address_response import CompanyAddressResponse
from domain.dto.customers.responses.create_customer_response import CreateCustomerUserResponse
from domain.dto.customers.responses.customer_response import CustomerResponse
from domain.dto.offsets.responses.offset_response import OffsetResponse
from domain.dto.projects.responses.project_response import ProjectResponse
from domain.dto.roles.responses.role_response import RoleResponse
from domain.dto.sustainable_development_goals.responses.software_development_goal_response import \
    SustainableDevelopmentGoalResponse
from domain.dto.users.responses.user_list_response import UserListResponseItem
from domain.dto.users.responses.user_response import UserResponse
from domain.entities import SustainableDevelopmentGoal, Offset
from domain.entities.company import Company
from domain.entities.company_address import CompanyAddress
from domain.entities.customer import Customer
from domain.entities.project import Project
from domain.entities.role import Role
from domain.entities.user import User


def register_automapper_profiles():
    mapper.add(source_cls=User, target_cls=[UserListResponseItem, UserResponse, CreateCustomerUserResponse])
    mapper.add(source_cls=Role, target_cls=RoleResponse)
    mapper.add(source_cls=Customer, target_cls=CustomerResponse)
    mapper.add(source_cls=Company, target_cls=CompanyResponse)
    mapper.add(source_cls=CompanyAddress, target_cls=CompanyAddressResponse)
    mapper.add(source_cls=Project, target_cls=ProjectResponse)
    mapper.add(source_cls=SustainableDevelopmentGoal, target_cls=SustainableDevelopmentGoalResponse)
    mapper.add(source_cls=Offset, target_cls=OffsetResponse)
