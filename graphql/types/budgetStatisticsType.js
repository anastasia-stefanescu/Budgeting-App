import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const budgetStatisticsType = new GraphQLObjectType({
    name: 'BudgetStatistics',
    fields: {
        id: { type: GraphQLInt },

        initialBalance: { type: GraphQLInt },
        currentBalance: { type: GraphQLInt },

        numberTransactions: { type: GraphQLInt },
    }
});

export default budgetStatisticsType;