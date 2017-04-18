from flask import request, abort
from simplepam import authenticate
from functools import wraps
import grp, pwd


def login_required():

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            try:
                if not authenticate(request.authorization.get('username'), request.authorization.get('password')):
                    abort(403)
            except:
                abort(403)
            return f(*args, **kwargs)

        return wrapper

    return decorator


def has_role(role):

    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            try:
                groups = [g.gr_name for g in grp.getgrall() if request.authorization.get('username') in g.gr_mem]
                if not role in groups:
                    abort(403)
            except:
                abort(403)
            return f(*args, **kwargs)

        return wrapper

    return decorator
