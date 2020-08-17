#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating database: ${DB_NAME}"

$POSTGRES <<EOSQL
CREATE DATABASE ${DB_NAME} OWNER ${POSTGRES_USER};
EOSQL

echo "Creating and populating schema..."
psql -d ${DB_NAME} -a -U${POSTGRES)_USER} -f /database/test-pg-data.sql
