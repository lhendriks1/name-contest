#!/bin/bash
set -e

POSTGRES="psql --username ${POSTGRES_USER}"

echo "Creating database: ${POSTGRES_DB}"

$POSTGRES <<EOSQL
CREATE DATABASE ${POSTGRES_DB} OWNER ${POSTGRES_USER};
EOSQL

echo "Creating and populating schema..."
psql -d ${POSTGRES_DB} -a -U ${POSTGRES_USER} -f /database/test-pg-data.sql
