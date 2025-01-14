import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const transactionsStatisticsType = new GraphQLObjectType({
    name: 'TransactionsStatistics',
    fields: {
        accountId: { type: GraphQLInt },
        budgetId: { type: GraphQLInt},

        amount: { type: GraphQLInt },
        numberTransactions: { type: GraphQLInt },

        begin: {type: GraphQLString},
        end: {type: GraphQLString}
    }
});

export default transactionsStatisticsType;