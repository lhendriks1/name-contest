// Import type helpers from graphql-js
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString
} = require('graphql');
const pgdb = require('../database/pgdb');
const MeType = require('./types/me'); // keep all types in their own file

// The root query type is where in the data graph
// we can start asking questions
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',

  fields: {
    hello: {
      type: GraphQLString,
      description: "Fields descriptions can use *markup*, **woo hoo!!**",
      resolve: () => 'world'
    },
    me: {
      type: MeType,
      description: 'The current user identified by an api key',
      args: {
        key: { type: new GraphQLNonNull(GraphQLString) }
      },
      // resolve: () => {
      //   return {id: 'hello', email: 'test'}
      // }
      // }

      resolve: (obj, args, {pgPool}) => {
        //read user info from database
        //using args.key as the api key
        //ctx from executor (passes pgPool)
        console.log(pgPool)
        return pgdb(pgPool).getUser(args.key);
     }
   }
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
  // mutation: ...
});

module.exports = ncSchema;
