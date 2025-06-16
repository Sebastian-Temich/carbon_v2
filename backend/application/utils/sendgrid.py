from application.config import Config
from send_grid.sendgrid_service import SendGridService

sendgrid = SendGridService(
    api_key=Config.SENDGRID_API_KEY,
    sender_email=Config.SENDGRID_SENDER_EMAIL,
    sender_name=Config.SENDGRID_SENDER_NAME
)
