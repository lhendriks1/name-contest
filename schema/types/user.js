// This whole module will be just an instance of the GraphQLObjectType class
const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLInt,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const pgdb = require('../../database/pgdb')
const mdb = require('../../database/mdb')
const ContestType = require('./contest')

module.exports = new GraphQLObjectType({
    name: 'UserType',
    fields: {
        id: { type: GraphQLID }, // GraphQLID is a special scalar type to represent a unique value
        email:{ type: new GraphQLNonNull(GraphQLString)}, // per db design email is required
        // firstName: { // this would work but will become repetitive so put logic in pgdb.js instead
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
        contestsCount: {
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}) {
                return mdb(mPool).getCounts(obj, fieldName)
            }
        },
        namesCount: {
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}) {
                return mdb(mPool).getCounts(obj, fieldName)
            }
        },
        votesCount: {
            type: GraphQLInt,
            resolve(obj, args, {mPool}, {fieldName}) {
                return mdb(mPool).getCounts(obj, fieldName)
            }
        },
        contests: {
            type: new GraphQLList(ContestType), // GraphQLList is a special type modifier for arrays
            resolve(obj, args, {pool} ) {
                // Read contests from db
                return pgdb(pool).getContests(obj);
            }
        }
    }
});