import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import groupBudgetType from './groupBudgetType.js';
import accountType from './accountType.js';

const groupTransferType = new GraphQLObjectType({
    name: 'GroupTransfer',
    fields: {
        id: { type: GraphQLInt },
        amount : { type: GraphQLInt },
        createdAt: { type: GraphQLString },
        account: {
            type: accountType,
            resolve: async (groupTransfer) => {
                return await groupTransfer.getAccount();
            }
        },
        budget: {
            type: groupBudgetType,
            resolve: async (groupTransfer) => {
                return await groupTransfer.getBudget();
            }
        },
    }
});

export default groupTransferType;