#!/bin/bash

rm -r /home/oper/.ignition/cache/*

/opt/ignition/clientlauncher.sh scope=C project={PROJECTNAME} gateway.addr={GATEWAYADDRESS} \
                                windowmode={WINDOWMODE} "-Djavaws.launchparams={LAUNCHPARAMS}" \
                                {LAUNCHPARAMVALUES}
