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

// pool.on('error', (err, client) => {
//   console.error('Unexpected error on idle client', err) // your callback here
//   process.exit(-1)
// })

const ncSchema = require('../schema'); // instance of graphql schema

// helper library will 1. extract query, 2. execute it against schema, 3. respond with result
const {graphqlHTTP} = require('express-graphql'); // holds a function ready to be plugged into the express route

const {MongoClient} = require('mongodb');
const assert = require('assert');
const mConfig = {
  url: 'mongodb://localhost:8081/contests'
}

app.use('/graphql', graphqlHTTP({
  schema: ncSchema,
  graphiql: true,
  context: {pool} // context object is always passed to ALL resolver functions as the third object
}));



app.listen(port, () => console.log(`Server running on port ${port}`));
