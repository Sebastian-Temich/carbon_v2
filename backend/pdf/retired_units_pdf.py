from typing import Type

from flask import abort
from fpdf import FPDF

from application import Config
from domain.enums.language_enum import Languages
from pdf.dto.get_retired_units_pdf_data import GetRetiredUnitsPdfData
from qr_code import generate_qr_code

creator = "Carbon"
contract_url = f"https://mumbai.polygonscan.com/address/{Config.CONTRACT_ADDRESS}"
font_family = "Arial"
font_size = 12

text_by_language = {
    Languages.EN: {
        "title": "EMISSIONS RETIREMENT CERTIFICATE",
        "section_1": [
            "This certificate is a confirmation of the retirement of",
            "equivalent of CO2e emissions to the atmosphere",
            "on the behalf of"
        ],
        "section_2": [
            "Identifier",
            "Date of retirement",
            "Period covered by emission reduction"
        ],
        "section_3": [
            "Origin of the retired units",
            "Project",
            "Country",
            "Location",
            "Year",
            "Verification report number",
            "Audit unit"
        ]
    },
    Languages.PL: {
        "title": "CERTYFIKAT UMORZENIA EMISJI",
        "section_1": [
            "Ten certyfikat jest potwierdzeniem umorzenia",
            "ekwiwalentu emisji CO2e do atmosfery",
            "na rzecz"
        ],
        "section_2": [
            "Identyfikator",
            "Data umorzenia",
            "Okres objęty redukcją emisji"
        ],
        "section_3": [
            "Pochodzenie umorzonych jednostek",
            "Projekt",
            "Kraj",
            "Lokalizacja",
            "Rok",
            "Numer raportu z weryfikacji",
            "Jednostka weryfikująca"
        ]
    }
}


def get_retired_units_pdf(data: GetRetiredUnitsPdfData, language: Type[Languages] = Languages.EN) -> bytearray:
    if language not in text_by_language:
        abort(400, f"Language {language} is not supported")

    text = text_by_language[language]

    pdf = FPDF()
    pdf.add_font(family=font_family, fname="pdf/fonts/arial.ttf", uni=True)
    pdf.add_page()
    pdf.set_creator(creator)
    pdf.set_display_mode(zoom="real", layout="single")
    pdf.set_title(f"{text['title']} {data.certificate_number}")

    add_title(pdf=pdf, data=data, text=text)
    add_section_1(pdf=pdf, data=data, text=text['section_1'])
    add_section_2(pdf=pdf, data=data, text=text['section_2'])
    add_section_3(pdf=pdf, data=data, text=text['section_3'])
    add_qr_code(pdf=pdf, qr_code_url=contract_url, qr_code_size=50)

    bytes_encoded = pdf.output()
    return bytes_encoded


def add_title(pdf: FPDF, data: GetRetiredUnitsPdfData, text: dict[str, str]):
    pdf.set_font(family=font_family, style="B", size=18)
    pdf.cell(w=0, h=9, txt=text['title'], ln=1, align="C")
    pdf.cell(w=0, h=9, txt=data.certificate_number, ln=1, align="C")
    add_vertical_space(pdf=pdf, height=9)


def add_section_1(pdf: FPDF, data: GetRetiredUnitsPdfData, text: list[str]):
    pdf.set_font(family=font_family, size=font_size)
    pdf.cell(w=0, h=7, txt=text[0], ln=1, align="C")
    pdf.set_font(family=font_family, style="B", size=font_size)
    pdf.cell(w=0, h=7, txt="{:,d} t".format(data.unit_count).replace(',', ' '), ln=1, align="C")
    pdf.set_font(family=font_family, size=font_size)
    pdf.cell(w=0, h=7, txt=text[1], ln=1, align="C")
    pdf.cell(w=0, h=7, txt=text[2], ln=1, align="C")
    pdf.set_font(family=font_family, style="B", size=font_size)
    pdf.cell(w=0, h=7, txt=data.company, ln=1, align="C")
    pdf.set_font(family=font_family, size=font_size)
    add_vertical_space(pdf=pdf, height=7)


def add_section_2(pdf: FPDF, data: GetRetiredUnitsPdfData, text: list[str]):
    pdf.cell(w=0, h=7, txt=f"{text[0]}: {data.offset_id}", ln=1, align="C")
    pdf.cell(w=0, h=7, txt=f"{text[1]}: {data.retirement_date:%Y/%m/%d}", ln=1, align="C")
    pdf.cell(w=0, h=7, txt=f"{text[2]}: {data.emission_reduction_period_start:%Y/%m/%d} - "
                           f"{data.emission_reduction_period_end:%Y/%m/%d}", ln=1, align="C")
    add_vertical_space(pdf=pdf, height=7)


def add_section_3(pdf: FPDF, data: GetRetiredUnitsPdfData, text: list[str]):
    pdf.set_font(family=font_family, style="B", size=font_size)
    pdf.cell(w=0, h=7, txt=text[0], ln=1, align="C")
    pdf.set_font(family=font_family, size=font_size)
    pdf.cell(w=0, h=7, txt=f"{text[1]}: {data.project}", ln=1, align="C")
    pdf.cell(w=0, h=7, txt=f"{text[2]}: {data.country}", ln=1, align="C")
    pdf.cell(w=0, h=7, txt=f"{text[3]}: {data.address}", ln=1, align="C")
    pdf.cell(w=0, h=7, txt=f"{text[4]}: {data.unit_creation_year}", ln=1, align="C")
    pdf.cell(w=0, h=7, txt=f"{text[5]}: {data.verification_report_number}", ln=1, align="C")
    pdf.cell(w=0, h=7, txt=f"{text[6]}: {data.audit_unit}", ln=1, align="C")
    add_vertical_space(pdf=pdf, height=7)


def add_vertical_space(pdf: FPDF, height: int):
    pdf.cell(w=0, h=height, ln=1)


def add_qr_code(pdf: FPDF, qr_code_url: str, qr_code_size: int):
    qr_code_img_bytes = generate_qr_code(data=qr_code_url)
    qr_code_x = (pdf.w - qr_code_size) / 2
    pdf.image(name=qr_code_img_bytes, x=qr_code_x, y=pdf.get_y(), w=qr_code_size, h=qr_code_size, link=qr_code_url)
