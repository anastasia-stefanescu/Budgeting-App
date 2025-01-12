import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const groupBudgetStatisticsType = new GraphQLObjectType({
    name: 'GroupBudgetStatistics',
    fields: {
        id: { type: GraphQLInt },
        description: { type: GraphQLString },
        amount: { type: GraphQLInt },
        amountPaid: { type: GraphQLInt },
        userContribution: { type: GraphQLInt },
        numberPaid: { type: GraphQLInt },
        numberUnpaid: { type: GraphQLInt },
        procPaid: { type: GraphQLInt },
        overBudget: { type: GraphQLInt },
    }
});

export default groupBudgetStatisticsType;