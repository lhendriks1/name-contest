const {
    GraphQLID,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const pgdb = require('../../database/pgdb')

module.exports = new GraphQLObjectType({
    name: 'Name',

    fields: () => {
        const UserType = require('./user');
        // must be scoped to avoid cyclic module dependency
        // (nameType depends on userType, userType depends on contestType, contestType depends on nameType
        // without this being a function, userType would have resolved to an empty object because it would not have finished executing because it depends on nameType
        // should always use this syntax because it is so useful and no reason not to
        return {
            id: { type: GraphQLID },
            label: {type: new GraphQLNonNull(GraphQLString)},
            description: {type: GraphQLString},
            createdAt: {type: new GraphQLNonNull(GraphQLString)},
            createdBy: {
                type: new GraphQLNonNull(UserType),
                resolve(obj, args, {pool}) {
                    return pgdb(pool).getUserById(obj.createdBy)
                }
            }
        };
    }
})