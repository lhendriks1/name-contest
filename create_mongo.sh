#!/bin/bash

set -e

echo "Starting mongo scripts for : ${MONGO_INITDB_DATABASE}...."

mongoimport --username mongo --password changeme --host localhost --port 8081 -d contests -c users /database/users.json
