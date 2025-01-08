import { GraphQLInputObjectType, GraphQLString, GraphQLInt } from 'graphql';

const groupBudgetInputType = new GraphQLInputObjectType({
    name: 'GroupBudgetInput',
    fields: {
        description: { type: GraphQLString },
        amount: { type: GraphQLInt },
        userContribution : { type: GraphQLInt },
    }
});

export default { groupBudgetInputType };