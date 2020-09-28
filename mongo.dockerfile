FROM mongo

#When a container is started for the first time it will execute files with extensions .sh and .js that are found in /docker-entrypoint-initdb.d
#COPY ./database/loadTestMongoData.js database/loadTestMongoData.js
COPY ./create_mongo.sh /docker-entrypoint-initdb.d/create_mongo.sh

#RUN chmod +x /database/loadTestMongoData.js
#RUN chmod +x /docker-entrypoint-initdb.d/create_mongo.sh

COPY ./database/users.json /database/users.json
RUN chmod +x /docker-entrypoint-initdb.d/create_mongo.sh


