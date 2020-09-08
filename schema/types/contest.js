const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull
} = require('graphql');

const ContestStatusType = require('./contest-status')

module.exports = new GraphQLObjectType({
    name: 'ContestType', // all types within a schema must have unique names
    fields: {
        id: {type: GraphQLID},
        code: {type: GraphQLNonNull(GraphQLString)},// notice code, title, status, and createdAt are all required because they are 'not null' in the db
        title: {type: GraphQLNonNull(GraphQLString)},
        description: {type: GraphQLString},
        status: {type: new GraphQLNonNull(ContestStatusType)}, // there are only 3 possible types so this is a GraphQLEnum which can be translated
        createdAt: {type: GraphQLNonNull(GraphQLString)}
    }
})