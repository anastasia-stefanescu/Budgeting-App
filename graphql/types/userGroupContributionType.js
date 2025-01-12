import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'

const userGroupContributionType = new GraphQLObjectType({
    name: 'UserGroupContribution',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        totalContribution: { type: GraphQLInt },
        nrBudgetsPaid: { type: GraphQLInt },
        procBudgetsPaid: { type: GraphQLInt },
    }
});

export default userGroupContributionType;