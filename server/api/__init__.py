# -*- coding: utf-8 -*-
"""

"""

from flask import Blueprint, request, jsonify
from server.backend import *
from server.config import *
from server.util import login_required
import pprint

import os

api = Blueprint('api', __name__)


@api.route('/', methods=['GET'])
@login_required()
def get():
    with open(os.path.join(TEMPLATES_ROOT, 'settings.json'), 'r') as f:
        return f.read()


@api.route('/', methods=['PUT'])
@login_required()
def put():
    raw_data = request.get_json(silent=True)

    with open(os.path.join(TARGET_ROOT, 'settings.json'), 'w') as f:
        f.write(request.get_data())
        return "Done"


@api.route('/network', methods=['GET'])
@login_required()
def get_network():
    with open(os.path.join(TEMPLATES_ROOT, 'settings.json'), 'r') as f:
        d = json.load(f)
        return jsonify(d['data']['network'])


@api.route('/network', methods=['POST'])
@login_required()
def post_network():
    raw_data = request.get_json(silent=True)

    with open(os.path.join(TEMPLATES_ROOT, 'settings.json'), 'r+') as f:
        d = json.loads(f.read())
        d['data']['network'] = raw_data['data']
        jd = json.dumps(d, indent=4)

        f.seek(0)
        f.write(jd)
        f.truncate()

        setup_network(d['data'])

        return jsonify(d)


@api.route('/ignition', methods=['GET'])
@login_required()
def get_ignition():
    with open(os.path.join(TEMPLATES_ROOT, 'settings.json'), 'r') as f:
        d = json.load(f)
        return jsonify(d['data']['ignition'])


@api.route('/ignition/validate', methods=['POST'])
@login_required()
def validate_ignition():
    gateway_address = "127.0.0.1"
    return get_ignition_projects(gateway_address) is not None


@api.route('/ignition/projects/<string:gateway_address>', methods=['GET'])
def get_ignition_projects(gateway_address):
    import requests
    from xml.dom import minidom

    url = "http://%s/main/system/projectlist" % gateway_address

    querystring = {"launcherAPIVersion": "3"}

    headers = {
        'cache-control': "no-cache"
    }

    try:
        response = requests.request("GET", url, headers=headers, params=querystring, timeout=10)

        xmldoc = minidom.parseString(u'{0}'.format(response.text).encode('utf-8'))
        project_data = xmldoc.getElementsByTagName('client')
        project_list = [
            {
                "name": project.attributes['name'].value,
            } for project in project_data
        ]
        return jsonify(project_list)
    except requests.RequestException:
        return jsonify([])


@api.route('/ignition', methods=['POST'])
@login_required()
def post_ignition():
    raw_data = request.get_json(silent=True)

    with open(os.path.join(TEMPLATES_ROOT, 'settings.json'), 'r+') as f:
        d = json.loads(f.read())
        d['data']['ignition'] = raw_data['data']
        jd = json.dumps(d, indent=4)

        f.seek(0)
        f.write(jd)
        f.truncate()

        setup_ignition(d['data'])

        return jsonify(d)


@api.route('/ntp', methods=['GET'])
@login_required()
def get_ntp():
    with open(os.path.join(TEMPLATES_ROOT, 'settings.json'), 'r') as f:
        d = json.load(f)
        return jsonify(d['data']['time_sync'])


@api.route('/ntp', methods=['POST'])
@login_required()
def post_ntp():
    raw_data = request.get_json(silent=True)

    with open(os.path.join(TEMPLATES_ROOT, 'settings.json'), 'r+') as f:
        d = json.loads(f.read())
        d['data']['time_sync'] = raw_data['data']
        jd = json.dumps(d, indent=4)

        f.seek(0)
        f.write(jd)
        f.truncate()

        setup_ntp(d['data'])

        return jsonify(d)


@api.route('/', methods=['POST'])
@login_required()
def post():

    data = request.get_json(silent=True).get('data')
    pprint.pprint(data)
    print(data.get('ignition'))
    print(data.get('ignition').get('address'))

    if data is not None:
        #data = try_load(SETTINGS_FILE_PATH)
        setup_ignition(data)
        setup_network(data)
        setup_ntp(data)
        return "Success"
    else:
        return 'Failure'


@api.route('/login', methods=['POST'])
@login_required()
def login():
    return "Success"

