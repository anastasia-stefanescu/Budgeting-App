import { GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import groupBudgetType from './groupBudgetType';
import accountType from './accountType';

const groupBudgetPayType = new GraphQLObjectType({
    name: 'GroupBudgetPay',
    fields: {
        id: { type: GraphQLInt },
        amount : { type: GraphQLInt },
        createdAt: { type: GraphQLString },
        account: {
            type: accountType,
            resolve: async (groupBudgetPay) => {
                return await groupBudgetPay.getAccount();
            }
        },
        budget: {
            type: groupBudgetType,
            resolve: async (groupBudgetPay) => {
                return await groupBudgetPay.getBudget();
            }
        },
    }
});

export default { groupBudgetPayType };