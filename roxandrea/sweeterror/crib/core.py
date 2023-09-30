import sys        
import traceback
from django.conf import settings
from .handlers import Handlers

def sweet_error_handler(default:any):
    def decorator(func):
        def wrapper(*args, **kwargs):
            try:
                result = func(*args, **kwargs)
                return result
            except Exception as e:
                traceback_str = traceback.format_exception(*sys.exc_info())
                error_meta_data = {"summary":str(e),"traceback":traceback_str}
                error_handlers = Handlers(error_meta_data)
                getattr(error_handlers,settings.CONFIG['DEFAULT_HANDLER'])(default,is_view=False)
                return default
        return wrapper
    return decorator

def requests_sweet_error_handler(default:{}):
    def decorator(func):
        def wrapper(*args, **kwargs):
            try:
                result = func(*args, **kwargs)
                return result
            except Exception as e:
                traceback_str = traceback.format_exception(*sys.exc_info())
                error_meta_data = {"summary":str(e),"traceback":traceback_str}
                error_handlers = Handlers(error_meta_data)
                return getattr(error_handlers,settings.CONFIG['DEFAULT_HANDLER'])(default)
        return wrapper
    return decorator
