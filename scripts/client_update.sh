#!/usr/bin/env bash

cd "${0%/*}"

(cd .. && docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v2 .)
gcloud docker -- push eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v2
kubectl edit deployment easy-notes-client
kubectl get deployments