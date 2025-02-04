import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import accountType from './accountType.js';

const budgetType = new GraphQLObjectType({
    name: 'Budget',
    fields: {
        id: {type: GraphQLInt},
        name: { type: GraphQLString },
        balance: { type: GraphQLInt},
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