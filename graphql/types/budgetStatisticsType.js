import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const groupBudgetStatisticsType = new GraphQLObjectType({
    name: 'GroupBudgetStatistics',
    fields: {
        id: { type: GraphQLInt },

        initialBalance: { type: GraphQLInt },
        currentBalance: { type: GraphQLInt },

        numberTransactions: { type: GraphQLInt },
    }
});

export default groupBudgetStatisticsType;