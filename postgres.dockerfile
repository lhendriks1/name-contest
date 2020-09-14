FROM postgres

# Custom initialization scripts
#When a container is started for the first time it will execute files with extensions .sh and .js that are found in /docker-entrypoint-initdb.dCOPY ./create_db.sh /docker-entrypoint-initdb.d/20-create_db.sh
COPY ./database/test-pg-data.sql database/test-pg-data.sql

RUN chmod +x /docker-entrypoint-initdb.d/20-create_db.sh