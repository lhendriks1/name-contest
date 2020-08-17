const { nodeEnv, port } = require('./util');
console.log(`Running in ${nodeEnv} mode`);
const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);
// need pg pool every time we want to resolve a field from the db
// use ctx obj (3 argument) of resolve
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
