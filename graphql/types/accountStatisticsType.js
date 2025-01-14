import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const accountStatisticsType = new GraphQLObjectType({
    name: 'AccountStatistics',
    fields: {
        id: { type: GraphQLInt },

        initialBalance: { type: GraphQLInt },
        currentBalance: { type: GraphQLInt },

        incomingTransactions: { type: GraphQLInt },
        outgoingTransactions: { type: GraphQLInt },
        incomingSum: { type: GraphQLInt },
        outgoingSum: { type: GraphQLInt },

        numberOfBudgets: { type: GraphQLInt },
    }
});

export default accountStatisticsType;