#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
kubectl delete service,deployment easy-notes-client
gcloud container images delete eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v3