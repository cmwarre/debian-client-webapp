# -*- coding: utf-8 -*-
"""

"""
import os

DEBUG = True
PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))

SECRET_KEY = "c1987yhue25-88ec-4ec2-b2fe-4c213413jki89"

if DEBUG:
    TARGET_ROOT = PROJECT_ROOT + "/server/backend/target/"  # in production this will be /
    TEMPLATES_ROOT = PROJECT_ROOT + "/server/backend/templates/"  # in production this will be /usr/share/ignition-client
    SETTINGS_FILE_PATH = TEMPLATES_ROOT + "settings.json"
else:
    TARGET_ROOT = "/"
    TEMPLATES_ROOT = PROJECT_ROOT + "/server/backend/templates/"
    SETTINGS_FILE_PATH = TEMPLATES_ROOT + "settings.json"


print(TEMPLATES_ROOT)
print(TARGET_ROOT)