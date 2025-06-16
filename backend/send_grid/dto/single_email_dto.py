from typing import Optional


class SingleEmailDto:
    def __init__(self,
                 recipient_email: str,
                 recipient_name: str,
                 template_id: str,
                 template_data: Optional[dict] = None):
        if template_data is None:
            template_data = {}
        self.recipient_email: str = recipient_email
        self.recipient_name: str = recipient_name
        self.template_id: str = template_id
        self.template_data: dict = template_data
