// This whole module will be just an instance of the GraphQLObjectType class
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLNonNull,
    GraphQLString
} = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'MeType',
    fields: {
        id: { type: GraphQLID },
        email:{ type: new GraphQLNonNull(GraphQLString)} // per db design email is required
    }
});