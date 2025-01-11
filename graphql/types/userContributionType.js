import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

const userContributionType = new GraphQLObjectType({
    name: 'UserContribution',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        contribution: { type: GraphQLInt },
    }
});

export default userContributionType;