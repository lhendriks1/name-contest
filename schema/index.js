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
// we can start asking questions (top level)
const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    hello: {
      type: GraphQLString, // graphQl is strongly typed, this is the type of the response
      description: "Fields descriptions can use *markup*, **woo hoo!!**",
      resolve: () => 'world'
    },
    me: {
      type: MeType,
      description: 'The current user identified by an api key',
      args: { // names of expect arguments as keys, and their type as definition
        key: { type: new GraphQLNonNull(GraphQLString) } // GraphQLNonNull is a type modifier that wraps the type to make it required
      },
      resolve: (obj, args, {pool}) => {
        //read user info from database
        //using args.key as the api key
        //ctx from executor is always 3rd arg (passes pgPool using destructuring)
        return pgdb(pool).getUser(args.key);
     }
   }
  }
});

const ncSchema = new GraphQLSchema({
  query: RootQueryType
  // mutation: ...
});

module.exports = ncSchema;
