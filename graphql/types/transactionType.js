import { GraphQLString, GraphQLInt, GraphQLObjectType } from "graphql";
import accountType from "./accountType.js";
import budgetType from "./budgetType.js";

const transactionType = new GraphQLObjectType({
    name: 'Transaction',
    fields: {
        id: {type: GraphQLInt},
        description: {type: GraphQLString},
        date: { type: GraphQLString },
        amount: { type: GraphQLInt},
        recipient: { type: GraphQLString },
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        account: { 
            type: accountType,
            resolve: async (transaction) => {
                const account = await transaction.getAccount(); // ??
                return account;
            }
        },
        budget: {
            type: budgetType,
            resolve: async (transaction) => {
                const budget = await transaction.getBudget();   // ???

                return budget;
            }
        }
    }
});

export default transactionType;