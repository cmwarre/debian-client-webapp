#!/usr/bin/python
import json
import os
import sys
import stat
import re
import argparse
from config import *

DEBUG_MODE = DEBUG


def try_load(settings_filepath):
    data = None
    try:
        settings_file = open(settings_filepath)
        data = json.load(settings_file)
    except IOError:
        print("No settings file found.  Running in interactive mode.")

    return data


def require_root():
    euid = os.geteuid()
    if euid != 0:
        print("Script not started as root. Running sudo.")
        args = ['sudo', sys.executable] + sys.argv + [os.environ]
        # the next line replaces the currently-running process with the sudo
        os.execlpe('sudo', *args)

    print("Running. Your euid is %s" % euid)


def write_template(in_filepath, out_filepath, replacements):

    in_file = open(in_filepath)
    out_file = open(out_filepath, "w")

    in_data = in_file.read()
    in_file.close()

    for key in replacements.keys():
        in_data = in_data.replace(key, replacements[key])

    out_file.write(in_data)
    out_file.close()


def validate_ntp(server):
    import ntplib

    print("Validating NTP Server %s" % server)

    valid = True
    try:
        ntplib.NTPClient().request(server)
    except:
        print("Error validating ntp server: %s" % server)
        valid = False

    return valid


def validate_ignition_server(gateway_address):
    import requests
    print("Validating Ignition Server...")

    try:
        url = "http://%s/main/system/gwinfo" % gateway_address

        querystring = {"launcherAPIVersion": "3"}

        headers = {
            'cache-control': "no-cache"
        }

        response = requests.request("GET", url, headers=headers, params=querystring, timeout=10)

    except:
        print("Couldn't reach gateway at %s" % gateway_address)
        return False

    if response.status_code == 200:
        return True
    else:
        return False


def get_ignition_projects(gateway_address):
    import requests
    from xml.dom import minidom

    url = "http://%s/main/system/projectlist" % gateway_address

    headers = {
        'cache-control': "no-cache"
    }

    response = requests.request("GET", url, headers=headers, timeout=10)

    xmldoc = minidom.parseString(u'{0}'.format(response.text).encode('utf-8'))
    project_data = xmldoc.getElementsByTagName('client')

    project_list = [project.attributes['name'].value for project in project_data]

    return project_list


def validate_ignition_project(gateway_address, project_name):
    print("Validating Ignition Project...")

    project_list = get_ignition_projects(gateway_address)

    if DEBUG_MODE:
        print(project_name)
        print(project_list)

    return project_name in project_list


def setup_network(data):

    # Write Hostname File
    with open(TARGET_ROOT + "etc/hostname", "w") as f:
        f.write("{0}.{1}".format(data['network']['hostname'], data['network']['domain_name']))
        f.close()

    # Write Hosts File
    write_template(
        in_filepath=TEMPLATES_ROOT + "hosts.txt",
        out_filepath=TARGET_ROOT +  "etc/hosts",
        replacements={
            "{HOSTNAME}" : data['network']['hostname'],
            "{DOMAINNAME}": data['network']['domain_name']
        }
    )

    # Write /etc/network/interfaces file.  Will intelligently decide if static/dhcp
    network_replacements = {
        "{NETWORKTYPE}": data['network']['type'],
        "{NETWORKSETTINGS}": ""
    }

    if data['network']['type'] == 'static':
        network_replacements["{NETWORKSETTINGS}"] = "address %s\n\tnetmask %s\n\tgateway %s\n\tdns-nameservers %s" % (
            data['network']['address'],
            data['network']['netmask'],
            data['network']['gateway'],
            ", ".join(data['network']['dns_nameservers'])
        )

    write_template(
        in_filepath=TEMPLATES_ROOT+"interfaces.txt",
        out_filepath=TARGET_ROOT+"etc/network/interfaces",
        replacements=network_replacements
    )


def setup_ntp(data):

    ntp_servers = data['time_sync']['servers']

    #if [validate_ntp(server) for server in ntp_servers].count(False) == 0:
    #    print("NTP Settings Valid")

    ntp_servers = ['server %s iburst' % server for server in data['time_sync']['servers']]

    write_template(
        in_filepath=TEMPLATES_ROOT+"ntp.conf",
        out_filepath=TARGET_ROOT+"etc/ntp.conf",
        replacements={
            "{NTPSERVERS}": "\n\t".join(ntp_servers)
        }
    )


def setup_ignition(data):
    # if validate_ignition_server(data['ignition']['address']):
    #     print("Ignition Gateway Valid")
    #
    # if validate_ignition_project(data['ignition']['address'], data['ignition']['project']):
    #     print("Ignition Project Valid")

    launch_params = data['ignition']['launch_params']
    launch_param_str = ""
    for key in launch_params:
        launch_param_str = launch_param_str + " -Djavaws.launchparam.%s=%s " % (key, launch_params[key])

    write_template(
        in_filepath=TEMPLATES_ROOT+"start-client.sh",
        out_filepath=TARGET_ROOT+"usr/bin/start-client.sh",
        replacements={
            "{PROJECTNAME}": data['ignition']['project'],
            "{GATEWAYADDRESS}": data['ignition']['address'],
            "{WINDOWMODE}": data['ignition']['windowmode'],
            "{LAUNCHPARAMS}": ";".join([key for key in launch_params]),
            "{LAUNCHPARAMVALUES}": launch_param_str
        }
    )
    st = os.stat(TARGET_ROOT+"usr/bin/start-client.sh")
    os.chmod(TARGET_ROOT+"usr/bin/start-client.sh", st.st_mode | stat.S_IEXEC)


#
#  Python 3 depricated raw_input in favor of input
def user_input(prompt):

    if sys.version_info > (3, 0):
        return input(prompt)
    else:
        return raw_input(prompt)


def get_input_in_list(prompt, allowed_list=None):

    if allowed_list is None:
        allowed_list = ['y', 'n']

    response = ""
    option_string = "(" + "|".join(allowed_list) + ") "
    while response not in allowed_list:
        response = user_input(prompt + option_string)

    return response


def get_boolean_input(prompt):
    return get_input_in_list(prompt, ['y', 'n']) == "y"


def get_validated_input(prompt, validation_func=None):

    response = ""
    while True:
        response = user_input(prompt)

        if validation_func(response):
            break
        else:
            if get_boolean_input("Response isn't valid. Would you like to use this anyway?"):
                break
            # end if
        # end if

    return response


def validate_ip(ip_address):
    pattern = re.compile("^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$")
    return pattern.match(ip_address)


def get_settings():

    data = {"network": {}}

    #
    # Get Network Settings
    data['network']['hostname'] = user_input("Hostname? ")
    data['network']['domain_name'] = user_input("Domain Name? ")
    data['network']['type'] = get_input_in_list("Network Type? ", ['dhcp', 'static'])

    if data['network']['type'] == 'static':
        data['network']['address'] = get_validated_input("IP Address? ", validate_ip)
        data['network']['netmask'] = get_validated_input("Subnet Mask? ", validate_ip)
        data['network']['gateway'] = get_validated_input("Gateway? ", validate_ip)

        dns_nameservers = [
            get_validated_input("Primary DNS Server IP? ", validate_ip),
            get_validated_input("Secondary DNS Server IP? ", validate_ip)
        ]

        data['network']['dns_nameservers'] = dns_nameservers

    #
    # Get NTP Settings
    data['time_sync'] = {}
    if get_boolean_input("Does your site use local NTP Servers? "):

        response = ""
        ntp_servers = []
        while response != 'n':
            ntp_servers.append(get_validated_input("NTP Server Address: ", validate_ntp))
            response = user_input("Add another? (y|n) ")

        data['time_sync']['servers'] = ntp_servers
    else:
        data['time_sync']['servers'] = [
            "0.debian.pool.ntp.org",
            "1.debian.pool.ntp.org",
            "2.debian.pool.ntp.org",
            "3.debian.pool.ntp.org"
        ]

    #
    # Get Ignition Settings
    data['ignition'] = {}

    data['ignition']['address'] = get_validated_input("Ignition Gateway Address? (ex gateway-ip:port) ", validate_ignition_server)

    def validate_project(project_name):
        return validate_ignition_project(gateway_address=data['ignition']['address'], project_name=project_name)

    data['ignition']['project'] = get_validated_input("Ignition Project Name? ", validate_project)
    data['ignition']['windowmode'] = get_input_in_list("Window Mode?", ['fullscreen', 'windowed'])

    if get_boolean_input('Use custom launch parameters? '):
        data['ignition']['launch_params'] = {}
        while True:
            response = user_input("Parameter name: ")
            key = response
            response = user_input("Parameter value: ")
            value = response
            data['ignition']['launch_params'][key] = value

            if not get_boolean_input("Add another? "):
                break

    return data


def __main__():
    """
    ignition-client-setup.py

    Written By: Cody Warren
    Date: October 2, 2016q

    Edits and stores all parameters for configuration files needed in Tamaki Ignition Debian Client.

    Usage:
        ignition-client-setup.py

    Options:
        -d  Enable debugging output

    """

    # TODO more arguments
    # parser = argparse.ArgumentParser()
    # parser.add_argument("-f", "--force", help="Force re-write files", dest="force_write", action="store_true")
    # parser.add_argument("-d", "--debug", help="Enable debugging output", dest="debug", action="store_true")
    # parser.add_argument("-i", "--interactive", help="Interactive mode", dest="interactive", action="store_true")
    # rgs = parser.parse_args()

    # restarts script if current user isn't root
    require_root()

    # try to load settings.json file
    data = try_load(SETTINGS_FILE_PATH)

    if data is None:
        interactive_mode = True
    else:
        interactive_mode = get_boolean_input("Settings file found, get new settings interactively? ")

    if interactive_mode:
        data = get_settings()

    if get_boolean_input("Write settings to system? "):
        setup_network(data)
        setup_ntp(data)
        setup_ignition(data)

    with open(SETTINGS_FILE_PATH, "w") as fp:
        json.dump(data, fp, indent=2, sort_keys=True)

if __name__ == "__main__":
        try:
            __main__()
        except KeyboardInterrupt:
            print("Keyboard Interrupt")
