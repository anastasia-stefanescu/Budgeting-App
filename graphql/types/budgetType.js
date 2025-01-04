import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import accountType from './accountType.js';

const budgetType = new GraphQLObjectType({
    name: 'Budget',
    fields: {
        name: { type: GraphQLString },
        Balance: { type: GraphQLInt},
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        account: { 
            type: accountType,
            resolve: async (budget) => {
                const account = await budget.getAccount();

                return account;
            }
        },
    }
});

export default budgetType;