#!/bin/bash
# export-realm.sh


docker compose up -d keycloak

# jetzt konfigurieren

docker exec -it keycloak bash

/opt/keycloak/bin/kc.sh export \
  --db postgres \
  --db-url jdbc:postgresql://postgres:5432/keycloak \
  --db-username keycloak \
  --db-password keycloak \
  --realm PcConfigurator \
  --dir /opt/keycloak/export \
  --users same_file

ls /opt/keycloak/export # checken

exit

docker cp keycloak:/opt/keycloak/export ./export

docker compose down

