from customresponses import *
from django.conf import settings
from sweeterror.models import SweetError


class Handlers(object):
    
    def __init__(self, meta_data):
        self.meta_data = meta_data

    def _error_response(self, response):
        return internal_server_error_response(response)
    

    def open_ai_response(self,response,is_view=True):
        try:
            if(settings.CONFIG['USE_DATABASE']):
                self.process = Process('OPEN_AI')
                self.save_to_db = {"summary": f"An error occurred: {str(self.meta_data.get('summary'))}",
                                "full_trace_back": self.meta_data.get('traceback', None),
                                }
                sweet_error_obj = self.process.error(self.save_to_db)
                sweet_error_instance = SweetError(**sweet_error_obj)
                sweet_error_instance.save()
            if(is_view):
                return self._error_response(response)
            else:
                return response
        except:
            if(is_view):
                return self._error_response(response)
            else:
                return response
    
    
class Process(object):
    
    def __init__(self, engine:str)->{}:
        self.engine = engine
        
    def error():
        return {}

    