const {
GraphQLEnumType
} = require('graphql')

module.exports = new GraphQLEnumType({
    name: 'ContestStatusType',
    values: {
        // values object lists all possible values for this enum.
        // The keys are how we want them represented in graphql queries and these could be anything
        // the values are how the enum values are represented in the database
        // in this case we are just making sure graphql is aware of the enum contraint
        // but it could also be used to let our users deal with strings instead of number for example
        DRAFT: {value: 'draft'},
        PUBLISHED: {value: 'published'},
        ARCHIVED: {value: 'archived'}
    }
})