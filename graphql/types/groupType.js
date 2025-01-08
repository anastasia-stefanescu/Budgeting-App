import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";
import { accountType } from "./accountType";
import { groupBudgetType } from './groupBudgetType';

const groupType = new GraphQLObjectType({
    name: 'Group',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        members: {
            type: new GraphQLList(accountType),
            resolve: async (group) => {
                return await group.getMembers();
            }
        },
        budgets: {
            type: new GraphQLList(groupBudgetType),
            resolve: async (group) => {
                return await group.getBudgets();
            }
        }
    }
});

export default { groupType };