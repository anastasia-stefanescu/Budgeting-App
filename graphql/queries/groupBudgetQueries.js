import { GraphQLInt, GraphQLList } from 'graphql';
import db from '../../models/index.js';
import groupBudgetType from '../types/groupBudgetType.js';

const groupBudgetQueryResolver = async (_, { id }) => {
    const budget = await db.GroupBudget.findOne({
        where: { id: id },
    });

    if(!budget) 
        return null;

    return budget;
};

const groupBudgetsQueryResolver = async (_, { groupId }) => {
    const budgets = await db.GroupBudget.findAll({
        where: { groupId },
    });

    return budgets;
};

export const groupBudgetQuery = {
    type: groupBudgetType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: groupBudgetQueryResolver,
};

export const groupBudgetsQuery = {
    type: new GraphQLList(groupBudgetType),
    args: {
        groupId: { type: GraphQLInt },
    },
    resolve: groupBudgetsQueryResolver,
};