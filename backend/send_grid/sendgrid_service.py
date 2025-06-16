import logging

from python_http_client import BadRequestsError
from sendgrid import SendGridAPIClient, Mail

from send_grid.dto.single_email_dto import SingleEmailDto


class SendGridService:
    def __init__(self, api_key: str, sender_email: str, sender_name: str):
        self.sg: SendGridAPIClient = SendGridAPIClient(api_key=api_key)
        self.sender_email: str = sender_email
        self.sender_name: str = sender_name

    def send_email(self, email_data: SingleEmailDto):
        mail = Mail(from_email=self.sender_email, to_emails=email_data.recipient_email)
        mail.template_id = email_data.template_id
        mail.dynamic_template_data = email_data.template_data

        try:
            self.sg.send(mail)
        except BadRequestsError as e:
            logging.error(e.body)
        except KeyError as e:
            logging.error(e)
