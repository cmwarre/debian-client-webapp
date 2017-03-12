# -*- coding: utf-8 -*-
"""

"""
import os

DEBUG_MODE = True
PROJECT_ROOT = os.path.dirname(os.path.realpath(__file__))

if DEBUG_MODE:
    TARGET_ROOT = PROJECT_ROOT + "/backend/target/"  # in production this will be /
    TEMPLATES_ROOT = PROJECT_ROOT + "/backend/templates/"  # in production this will be /usr/share/ignition-client
    SETTINGS_FILE_PATH = TEMPLATES_ROOT + "settings.json"
else:
    TARGET_ROOT = "/"
    TEMPLATES_ROOT = PROJECT_ROOT + "/backend/templates/"
    SETTINGS_FILE_PATH = TEMPLATES_ROOT + "settings.json"


print(TEMPLATES_ROOT)
print(TARGET_ROOT)