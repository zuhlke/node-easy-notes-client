#!/usr/bin/env bash

cd "${0%/*}"
. common_config.sh
gcloud sql instances create pactbroker-postgres --cpu=2 --memory=7680MiB --database-version=POSTGRES_9_6 --gce-zone=europe-west2-c
gcloud sql users set-password postgres --host=no-host --instance=pactbroker-postgres --password=changeit
gcloud sql databases create pactbroker --instance=pactbroker-postgres