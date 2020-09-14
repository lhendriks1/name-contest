FROM mongo

#When a container is started for the first time it will execute files with extensions .sh and .js that are found in /docker-entrypoint-initdb.d
COPY ./database/loadTestMongoData.js database/loadTestMongoData.js

#RUN chmod +x /docker-entrypoint-initdb.d/20-create_mongo.sh
