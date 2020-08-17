FROM postgres

# Custom initialization scripts
# base postgres image runs on start any scripts present in docker-entrypoint-initdb.d directory
COPY ./create_db.sh /docker-entrypoint-initdb.d/20-create_db.sh
COPY ./database/test-pg-data.sql database/test-pg-data.sql

RUN chmod +x /docker-entrypoint-initdb.d/20-create_db.sh