# -*- coding: utf-8 -*-
"""

"""

from flask import Flask, render_template
from api import api

app = Flask(__name__)
app.config.from_object('config')


# redirect to index on 404 (needed for react router pages)
@app.errorhandler(404)
@app.route('/')
def index(e=None):
    return render_template('index.html')

# debug settings
if True:

    # disable the cache in debug mode so that react js components will reload on refresh
    @app.after_request
    def add_header(r):
        r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
        r.headers["Pragma"] = "no-cache"
        r.headers["Expires"] = "0"
        r.headers['Cache-Control'] = 'public, max-age=0'
        return r

app.register_blueprint(api, url_prefix="/api")