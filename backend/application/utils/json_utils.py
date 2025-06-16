import json
from datetime import date
from json import JSONEncoder
from typing import Any
from uuid import UUID

from flask.json.provider import DefaultJSONProvider


class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        if isinstance(obj, UUID):
            return str(obj)
        return super().default(obj)


class CustomJSONProvider(DefaultJSONProvider):
    def dumps(self, obj: Any, **kwargs: Any) -> str:
        return json.dumps(obj, **kwargs, cls=CustomJSONEncoder)
