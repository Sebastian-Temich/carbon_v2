from random import randint
from uuid import UUID

from flask import abort, make_response
from flask_jwt_extended import get_current_user

from domain.entities import Offset, Project
from domain.enums.offset_status_enum import OffsetStatuses
from pdf import get_retired_units_pdf
from pdf.dto.get_retired_units_pdf_data import GetRetiredUnitsPdfData


def handle_get_offset_summary_file(offset_id: UUID):
    offset = Offset.query.get(offset_id)

    if not offset:
        abort(404, 'Offset not found')

    current_user = get_current_user()
    company_id = current_user.customer.company_id

    if company_id != offset.owned_by_company_id:
        abort(403, 'Cannot download this file')

    offset_status_name = offset.offset_status.name

    match offset_status_name:
        case OffsetStatuses.RETIRED:
            filename, file = get_file_data_for_retired(offset=offset)
        case _:
            return abort(400, f"Status {offset_status_name} is not allowed")

    response = make_response(file)
    response.headers.set('Content-Disposition', 'attachment', filename=filename)
    response.headers.set('Content-Type', 'application/pdf')

    return response, 200


def get_file_data_for_retired(offset: Offset):
    filename = f"retired_units_{offset.id}.pdf"
    project = Project.query.get(offset.project_id)
    get_retired_units_pdf_request = GetRetiredUnitsPdfData(
        certificate_number=hex(randint(10_000, 1_000_000)).upper(),  # TODO: TBD
        unit_count=offset.unit_count,
        company=offset.owned_by_company.name,
        offset_id=str(offset.id),
        retirement_date=offset.retirement_date,
        emission_reduction_period_start=project.start_date,
        emission_reduction_period_end=project.expected_end_date,
        project=project.name,
        country=project.country.name,
        address=project.address,
        unit_creation_year=offset.unit_creation_year.year,
        audit_unit=offset.audit_unit.name,
        verification_report_number=randint(0, 100)  # TODO: TBD
    )

    file = get_retired_units_pdf(data=get_retired_units_pdf_request)

    return filename, file
