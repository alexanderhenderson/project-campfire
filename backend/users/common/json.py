import decimal
from datetime import datetime, time
from json import JSONEncoder
from django.db.models import QuerySet
from django.urls import NoReverseMatch


class DecimalEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super().default(o)


class DateEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime) or isinstance(o, time):
            return o.isoformat()
        else:
            return super().default(o)


class QuerySetEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, QuerySet):
            return list(o)
        else:
            return super().default(o)


class ModelEncoder(DateEncoder, DecimalEncoder, QuerySetEncoder, JSONEncoder):
    encoders = {}

    def default(self, o):
        if isinstance(o, self.model):
            d = {}
            if hasattr(o, "get_api_url"):
                try:
                    d["href"] = o.get_api_url()
                except NoReverseMatch:
                    pass
            for property in self.properties:
                encoder = self.encoders.get(property)
                value = getattr(o, property)
                if hasattr(value, "all") and callable(value.all):
                    value = map(
                        encoder.default if encoder else lambda x: x,
                        list(value.all()),
                    )
                    value = list(value)
                elif encoder:
                    value = encoder.default(value)
                d[property] = value
            d.update(self.get_extra_data(o))
            return d
        else:
            return super().default(o)

    def get_extra_data(self, o):
        return {}
