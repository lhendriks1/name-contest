const { nodeEnv, port } = require('./util');
console.log(`Running in ${nodeEnv} mode`);
const { Pool, Client } = require('pg')
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
const pool = new Pool('postgres://postgres:hello@localhost:5432');


// const pgPool = new pg.Pool({connectionString: 'postgres://unicorn_user:hello@postgres:5432/contests'});


pool.query('SELECT NOW()', (err, res) => {
  console.log(err, res)
  pool.end()
})
// you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()

const app = require('express')();
//
// const ncSchema = require('../schema');
//
// // helper library will 1. extract query, 2. execute it against schema, 3. respond with result
// const {graphqlHTTP} = require('express-graphql'); // holds a function ready to be plugged into the express route
//
// app.use('/graphql', graphqlHTTP({
//   schema: ncSchema,
//   graphiql: true,
//   context: {pgPool}
// }));

app.get("/ping", async (req, res) => {
  const database = await client.query("SELECT 1 + 1").then(() => "up").catch(() => "down");

  res.send({
    environment: process.env.NODE_ENV,
    database,
  });
});

(async () => {
  await client.connect();

  app.listen(port, () => {
    console.log("Started at http://localhost:%d", port);
  });
})();