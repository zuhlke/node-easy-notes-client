#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
docker images --format '{{.Repository}}:{{.Tag}}' | grep easy-notes-client | xargs docker rmi -f
(cd .. && docker build -t eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v6 .)
gcloud docker -- push eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v6
kubectl run easy-notes-client --image=eu.gcr.io/zuhlke-kubernetes-codelab/easy-notes-client:v6 --port=8081
kubectl get deployments
kubectl get pods
kubectl cluster-info
kubectl expose deployment easy-notes-client --type="LoadBalancer"