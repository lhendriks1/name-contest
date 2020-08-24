const { nodeEnv, port } = require('./util');
console.log(`Running in ${nodeEnv} mode`);
const pg = require('pg');
// const pgConfig = require('../config/pg')[nodeEnv];
// const pgPool = new pg.Pool(pgConfig);
// need pg pool every time we want to resolve a field from the db
// use ctx obj (3 argument) of resolve
//
const pgPool = new pg.Pool({
  user: 'unicorn_user',
  host: 'postgres',
  database: 'contests',
  password: 'hello',
  port: 5432
});

// const pgPool = new pg.Pool({connectionString: 'postgres://unicorn_user:hello@postgres:5432/contests'});


// pgPool.connect((err, client, release) => {
//   console.log('inside pgPool')
//   if (err) {
//     return console.error('Error acquiring client', err.stack)
//   }
//   client.query('SELECT NOW()', (err, result) => {
//     release()
//     if (err) {
//       return console.error('Error executing query', err.stack)
//     }
//     console.log(result.rows)
//   })
// })

const app = require('express')();

const ncSchema = require('../schema');

// helper library will 1. extract query, 2. execute it against schema, 3. respond with result
const {graphqlHTTP} = require('express-graphql'); // holds a function ready to be plugged into the express route

app.use('/graphql', graphqlHTTP({
  schema: ncSchema,
  graphiql: true,
  context: {pgPool}
}));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`)
});
