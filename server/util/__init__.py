from flask import request, abort
from simplepam import authenticate
from functools import wraps


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