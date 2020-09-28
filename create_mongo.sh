#!/bin/bash

set -e

echo "Starting mongo scripts for : ${MONGO_INITDB_DATABASE}...."

mongoimport --host mongo --port 27017 --db contests --collection users --type json --file /database/users.json --jsonArray
