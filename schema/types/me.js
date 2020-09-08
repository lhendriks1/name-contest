// This whole module will be just an instance of the GraphQLObjectType class
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const pgdb = require('../../database/pgdb')
const ContestType = require('./contest')

module.exports = new GraphQLObjectType({
    name: 'MeType',
    fields: {
        id: { type: GraphQLID }, // GraphQLID is a special scalar type to represent a unique value
        email:{ type: new GraphQLNonNull(GraphQLString)}, // per db design email is required
        // firstName: { // thjs would work but will become repetitive
        //     type: GraphQLString,
        //     resolve: obj => obj.first_name
        // },
        firstName: {type: GraphQLString},
        lastName: {type: GraphQLString},
        fullName: {
            type: GraphQLString,
            resolve: obj => `${obj.firstName} ${obj.lastName}`
        },
        createdAt: {type: GraphQLString},
        contests: {
            type: new GraphQLList(ContestType), // GraphQLList is a special type modifier for arrays
            resolve(obj, args, {pool} ) {
                // Read contests from db
                return pgdb(pool).getContests(obj);
            }
        }
    }
});