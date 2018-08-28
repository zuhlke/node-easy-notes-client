#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
kubectl delete service,deployment pact-broker