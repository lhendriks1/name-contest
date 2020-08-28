// Destructure type helpers which will help define the schema
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
} = require("graphql");

const ContestType = require('./contest');

// Export schema object
module.exports = new GraphQLObjectType({
    name: 'MeType',
    fields: {
        id: {type: GraphQLID},
        firstName: {type: GraphQLID},
        lastName: {type: GraphQLID},
        fullName: {
            type: GraphQLString,
            resolve: obj => `${obj.firstName + " " + obj.lastName}`
        },
        email: {type: GraphQLNonNull(GraphQLString)},
        // contests: {
        //     type: new GraphQLList(ContestType),
        //     resolve() {
        //         // Read contests from db
        //     }
        // }
    }
});