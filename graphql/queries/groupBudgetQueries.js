import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import { groupBudgetType } from '../types/groupBudgetType.js';

const groupBudgetQueryResolver = async (_, { id }) => {
    const budget = await db.Member.findOne({
        where: { id: id },
    });

    if(!budget) 
        return null;

    return budget;
};

const groupBudgetsQueryResolver = async (_, { groupId }) => {
    const budgets = await db.Member.findAll({
        where: { groupId },
    });

    return budgets;
};

const groupBudgetQuery = {
    type: groupBudgetType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: groupBudgetQueryResolver,
};

const groupBudgetsQuery = {
    type: new GraphQLList(groupBudgetType),
    args: {
        groupId: { type: GraphQLInt },
    },
    resolve: groupBudgetsQueryResolver,
};

export default { groupBudgetQuery, groupBudgetsQuery };