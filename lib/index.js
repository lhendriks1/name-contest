const express = require('express');
const app = express();
const { nodeEnv, port } = require('./util');

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'contests',
  password: 'changeme',
  port: 5432
})

const ncSchema = require('../schema'); // instance of graphql schema

// helper library will 1. extract query, 2. execute it against schema, 3. respond with result
const {graphqlHTTP} = require('express-graphql'); // holds a function ready to be plugged into the express route

const {MongoClient} = require('mongodb');
const assert = require('assert');
const mConfig = {
  url: 'mongodb://mongo:27017'
}
const mdbName = 'contests';

MongoClient.connect(mConfig.url, (err, client) => {
  assert.equal(err, null)
  const mPool = client.db(mdbName)
  // Need the Mongo pool to be available to all resolvers, so endpoint and server listen call are inside here
  app.use('/graphql', graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: {pool, mPool} // context object is always passed to ALL resolver functions as the third object
  }));

  app.listen(port, () => console.log(`Server running on port ${port}`));
 })

