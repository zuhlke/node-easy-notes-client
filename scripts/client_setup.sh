#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v1 .
gcloud docker -- push eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v1
kubectl run easy-notes-client --image=eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v1 --port=8080
kubectl get deployments
kubectl get pods
kubectl cluster-info
kubectl expose deployment easy-notes-client --type="LoadBalancer"