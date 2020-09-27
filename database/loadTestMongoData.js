const { MongoClient } = require('mongodb');
const assert = require('assert');
const { nodeEnv } = require('../lib/util');
const mongoConfig = require('../config/mongo')[nodeEnv];

console.log(`HELLOOOOO running in g${nodeEnv} on ${mongoConfig}`)

MongoClient.connect(mongoConfig.url, (err, db) => {
  assert.equal(null, err);
  console.log('Connected successfully to mongo server')

  db.collection('users').insertMany([
    {
      userId: 1,
      contestsCount: 3,
      namesCount: 0,
      votesCount: 4
    },
    {
      userId: 2,
      contestsCount: 0,
      namesCount: 4,
      votesCount: 4
    }
  ]).then(response => {
    console.log(response);
    db.close();
  });
});
