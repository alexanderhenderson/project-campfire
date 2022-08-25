from json import JSONEncoder
from django.urls import NoReverseMatch
from django.db.models import QuerySet, ManyToManyField
from datetime import datetime, time
import decimal

class DecimalEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            return str(o)
        return super().default(o)
        #return super(DecimalEncoder, self).default(o)

class DateEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, datetime) or isinstance(o, time):
            return o.isoformat()
        else:
            print("Printstop 9")
            return super().default(o)


class QuerySetEncoder(JSONEncoder):
    def default(self, o):
        if isinstance(o, QuerySet):
            return list(o)
        else:
            print("Printstop 10", type(self), self)
            print("Printstop 11", type(o), o)
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
        if hasattr(o, "all"):
            print("test passes")
            #return list(o.all())
            print(type(list(o.all())))
            return list(o.all())
        else:
            return super().default(o)

class ModelEncoder(DateEncoder, QuerySetEncoder, DecimalEncoder, JSONEncoder):
    encoders = {}

    def default(self, o):
        if isinstance(o, self.model):
            print("ModelEncoder")
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



# class ModelEncoder(QuerySetEncoder, ManyRelatedManagerEncoder, DateEncoder, DecimalEncoder, JSONEncoder):
#     encoders = {}

#     def default(self, o):
#         print("Printstop 1", type(self), type(o))
#         if isinstance(o, self.model):
#             print("Printstop 2")
#             d = {}
#             if hasattr(o, "get_api_url"):
#                 print("Printstop 3")
#                 try:
#                     d["href"] = o.get_api_url()
#                     print("Printstop 4")

#                 except NoReverseMatch:
#                     print("Printstop 5")
#                     pass
#             for property in self.properties:
#                 print("Printstop 6")

#                 value = getattr(o, property)
#                 if property in self.encoders:
#                     print("Printstop 7 - property: ", property)
#                     print("Value type: ", type(value), " value: ", value)
#                     encoder = self.encoders[property]
#                     value = encoder.default(value)
#                     print("Return from nested default call")
#                 d[property] = value
#             d.update(self.get_extra_data(o))
#             return d
#         else:
#             print("Printstop 8")
#             return super().default(o)

#     def get_extra_data(self, o):
#         return {}

