const { nodeEnv } = require("./util");

const pg = require('pg');
const pgConfig = require('../config/pg')[nodeEnv];
const pgPool = new pg.Pool(pgConfig);

console.log(`Running in ${nodeEnv} mode...`);

const express = require('express');
const app = express();

const graphqlHTTP = require("express-graphql");
const ncSchema = require("../schema");

app.use(
  "/graphql",
  graphqlHTTP({
    schema: ncSchema,
    graphiql: true,
    context: {pgPool}
  })
);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
