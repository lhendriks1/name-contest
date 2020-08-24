FROM node:latest

ENV NODE_ENV=development
ENV PORT=8080

# Create app directory
WORKDIR   /var/www

# Copy package.json and package.lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Bundle app source
COPY . /var/www

EXPOSE $PORT

CMD ["npm", "run", "dev"]