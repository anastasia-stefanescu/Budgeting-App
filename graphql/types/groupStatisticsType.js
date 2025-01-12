import { GraphQLInt, GraphQLObjectType, GraphQLString } from "graphql";

const groupStatisticsType = new GraphQLObjectType({
    name: 'GroupStatistics',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        totalBudget: { type: GraphQLInt },
        totalBudgetPaid: { type: GraphQLInt },
        procPaid: { type: GraphQLInt },
        nrBudgets: { type: GraphQLInt },
        nrBudgetsPaid: { type: GraphQLInt },
        procBudgetsPaid: { type: GraphQLInt },
        nrMembers: { type: GraphQLInt },
    }
});

export default groupStatisticsType;