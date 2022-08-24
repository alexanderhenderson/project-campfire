from json import JSONEncoder
from django.urls import NoReverseMatch
from django.db.models import QuerySet, ManyToManyField
from datetime import datetime, time
import decimal
import json

class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super(DecimalEncoder, self).default(o)

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

# class ManyToManyEncoder(JSONEncoder):
#     def default(self, o):
#         if isinstance(o, ManyToManyField):
#             print("TEST PASSED")
#             return list(o)
#         else:
#             return super().default(o)

class ManyRelatedManagerEncoder(JSONEncoder):
    def default(self, o):
        if type(o) == 'ManyRelatedManager':
            print("test passes")
            return list(o)
        else:
            return super().default(o)

class ModelEncoder(DateEncoder, DecimalEncoder, QuerySetEncoder, ManyRelatedManagerEncoder, JSONEncoder):
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
                value = getattr(o, property)
                if property in self.encoders:
                    encoder = self.encoders[property]
                    value = encoder.default(value)
                d[property] = value
            d.update(self.get_extra_data(o))
            return d
        else:
            return super().default(o)

    def get_extra_data(self, o):
        return {}
