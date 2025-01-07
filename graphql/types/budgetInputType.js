import {GraphQLInputObjectType, GraphQLString, GraphQLInt} from 'graphql'

const budgetInputType = new GraphQLInputObjectType({
    name: 'BudgetInput',
    fields: {
        name: { type: GraphQLString },
        balance: { type: GraphQLInt},
    }
});

export default budgetInputType;