// Destructure type helpers which will help define the schema
const {
  GraphQLNonNull,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
} = require("graphql");

const pgdb = require('../database/pgdb');
const MeType = require("./types/index.js");

// The root query type is the starting point of the data graph
// All fields defined here will be available on the top level scope
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
    //   resolve: () => {
    //     return {id: 'hello', email: 'test'}
    //   }
    // }

      resolve: (obj, args, {pgPool}) => {
        //read user info from database
        //using args.key as the api key
        //ctx from executor (passes pgPool)
        console.log('pgPool: ', pgPool)
        return pgdb(pgPool).getUser(args.key);
     }
   }
  }
});

// Schema is an instance of GraphQLSchema and takes a configuration obj
// For a schema the config obj has two properties: query and mutation
const ncSchema = new GraphQLSchema({
  query: RootQueryType, // properties expect a graphQL object type
  // mutation: ...
});

module.exports = ncSchema;
