#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
gcloud sql users create pactproxyuser --host=no-host --instance=pactbroker-postgres --password=changeit
kubectl create secret generic cloudsql-instance-credentials --from-file=credentials.json=${HOME}/Downloads/zuhlke-kubernetes-codelab-671e20617f02.json
kubectl create secret generic cloudsql-db-credentials --from-literal=username=pactproxyuser --from-literal=password=changeit

#zuhlke-kubernetes-codelab:europe-west2:pactbroker-postgres
