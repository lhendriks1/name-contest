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
//
// // promise - checkout a client
// pool.connect()
//     .then(client => {
//       return client.query('SELECT * FROM users WHERE id = $1', [1]) // your query string here
//           .then(res => {
//             client.release()
//             console.log(res.rows[0]) // your callback here
//           })
//           .catch(e => {
//             client.release()
//             console.log(e.stack) // your callback here
//           })
//     })

const ncSchema = require('../schema'); // instance of graphql schema

// helper library will 1. extract query, 2. execute it against schema, 3. respond with result
const {graphqlHTTP} = require('express-graphql'); // holds a function ready to be plugged into the express route

const {MongoClient} = require('mongodb');
const assert = require('assert');
// const mConfig = { // todo
//   url: 'mongodb://localhost:3000/contests'
// }

app.use('/graphql', graphqlHTTP({
  schema: ncSchema,
  graphiql: true,
  context: {pool} // context object is always passed to ALL resolver functions as the third object
}));



app.listen(port, () => console.log(`Server running on port ${port}`));
