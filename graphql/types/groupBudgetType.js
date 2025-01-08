import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { groupType } from "./groupType";
import { accountType } from './accountType';

const groupBudgetType = new GraphQLObjectType({
    name: 'GroupBudget',
    fields: {
        id: { type: GraphQLInt },
        description: { type: GraphQLString },
        amount: { type: GraphQLInt },
        amountPaid: { type: GraphQLInt },
        userContribution: { type: GraphQLInt },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        group: {
            type: groupType,
            resolve: async (groupBudget) => {
                return await groupBudget.getGroup();
            }
        },
        account: {
            type: accountType,
            resolve: async (groupBudget) => {
                return await groupBudget.getAccount();
            }
        }
    }
});

export default { groupBudgetType };