#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
kubectl apply -f ../resources/gcloud-pact-broker.yml
kubectl expose deployment pact-broker --type="LoadBalancer"