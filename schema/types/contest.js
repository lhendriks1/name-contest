const {
    GraphQLObjectType,
    GraphQLID,
    GraphQLString,
    GraphQLNonNull,
    GraphQLList
} = require('graphql');

const ContestStatusType = require('./contest-status')
const NameType = require('./name');
const UserType = require('./user');
const pgdb = require('../../database/pgdb');

module.exports = new GraphQLObjectType({
    name: 'ContestType', // all types within a schema must have unique names
    fields: () => {
        const UserType = require('./user');

        return {
            id: {type: GraphQLID},
            code: {type: GraphQLNonNull(GraphQLString)},// notice code, title, status, and createdAt are all required because they are 'not null' in the db
            title: {type: GraphQLNonNull(GraphQLString)},
            description: {type: GraphQLString},
            status: {type: new GraphQLNonNull(ContestStatusType)}, // there are only 3 possible types so this is a GraphQLEnum which can be translated
            createdAt: {type: GraphQLNonNull(GraphQLString)},
            // createdBy: {
            //     type: GraphQLNonNull(GraphQLString) // createdBy exposes a number, which is not super helpful -- more helpful would be to expose the user object associated with that number
            // },
            createdBy: {
                type: new GraphQLNonNull(UserType),
                resolve(obj, args, {pool}) {
                    return pgdb(pool).getUserById(obj.createdBy)
                }
            },
            names: {
                type: new GraphQLList(NameType),
                resolve(obj, args, {pool}) {
                    return pgdb(pool).getNames(obj);
                }
            }
        }

    }

})