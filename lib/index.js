const express = require('express');
const app = express();
const { nodeEnv, port } = require('./util');

// const { Pool } = require('pg')
// const databaseConfig = { connectionString: "postgres://postgres:changeme@db:5432/contests" };
// const pool = new Pool(databaseConfig)

const { Pool } = require('pg')
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'contests',
  password: 'changeme',
  port: 5432
})

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err) // your callback here
  process.exit(-1)
})

// promise - checkout a client
pool.connect()
    .then(client => {
      return client.query('SELECT * FROM users WHERE id = $1', [1]) // your query string here
          .then(res => {
            client.release()
            console.log(res.rows[0]) // your callback here
          })
          .catch(e => {
            client.release()
            console.log(e.stack) // your callback here
          })
    })

// const query = `
// CREATE TABLE users (
//     email varchar,
//     firstName varchar,
//     lastName varchar,
//     age int
// );
// `;
// const client = new Client()
// client.query(query, (err, res) => {
//   if (err) {
//     console.error(err);
//     return;
//   }
//   console.log('Table is successfully created');
//   client.end();
// });
//
// pool.query('SELECT NOW()', (err, res) => {
//   console.log("$$$$$$$$$$$$$$$$$$$")
//   console.log(err, res)
//   pool.end()
// })
// setTimeout(function(){ console.log("timeout!!!!!!!!!!"); }, 3000)



// const client = new Client()
// ;(async () => {
//   await client.connect()
//   const res = await client.query('SELECT $1::text as message', ['Hello world!'])
//   console.log(res.rows[0].message) // Hello world!
//   await client.end()
// })()
// client.connect({connectionString: 'postgres://postgres:hello@localhost:5432/contests'})
// client.query('SELECT $1::text as message', ['Hello world!'], (err, res) => {
//   console.log(err ? err.stack : res.rows[0].message) // Hello World!
//   client.end()
// })


// pg.connect('postgres://postgres:hello@localhost:5432')
// const pgPool = new Pool('postgres://postgres:hello@localhost:5432')

// const { Pool, Client } = require('pg')
// pools will use environment variables
// for connection information

// const client = new Client({
//   password: "hello",
//   user: "postgres",
//   host: "postgres",
// });

// const pgConfig = require('../config/pg')[nodeEnv];
// const pgPool = new pg.Pool(pgConfig);
// need pg pool every time we want to resolve a field from the db
// use ctx obj (3 argument) of resolve
//
// const pool = new Pool('postgres://postgres:hello@localhost:5432');

//console.log("!!!!!!!!!!!!!!!!!setting up connection")
// const pgPool = new Pool({connectionString: 'postgres://postgres:hello@localhost:5432/contests'});
// pgPool.query(`
//             select * from users
//             where api_key = $1
//             `, [4242]).then(res => {
//   console.log("done!!!!!!!!!!!!!")
// });
// console.log(pgPool)


// you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()
//
const ncSchema = require('../schema');
//
// // helper library will 1. extract query, 2. execute it against schema, 3. respond with result
const {graphqlHTTP} = require('express-graphql'); // holds a function ready to be plugged into the express route
//
// app.use('/graphql', graphqlHTTP({
//   schema: ncSchema,
//   graphiql: true,
//   context: {pgPool}
// }));



app.listen(port, () => console.log(`Server running on port ${port}`));
