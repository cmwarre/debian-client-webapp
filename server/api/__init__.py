# -*- coding: utf-8 -*-
"""

"""

from flask import Blueprint, request, jsonify

api = Blueprint('api', __name__)


@api.route('/', methods=['GET'])
def get():
    return "Hello World"



