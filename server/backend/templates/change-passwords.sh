#!/bin/bash

if [ "$(id -u)" != "0" ]; then
   echo "This script must be run as root" 1>&2
   exit 1
fi

echo "Changing password for root"
passwd

echo "Changing password for VNC"
x11vnc --storepasswd /etc/x11vnc.pass
