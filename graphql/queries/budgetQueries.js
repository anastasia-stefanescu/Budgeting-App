import { GraphQLList, GraphQLInt } from 'graphql';
import budgetType from '../types/budgetType.js';
import db from '../../models/index.js';

const budgetsQueryResolver = async () => {
    const budgets = await db.Budget.findAll();

    return budgets;
}

const budgetQueryResolver = async (_, { id }) => {
    const budget = await db.Budget.findOne({
        where: {
            id,
        }
    });

    if (!budget) {
        return null;
    }

    return budget;
}

export const budgetsQuery = {
    type: new GraphQLList(budgetType),
    resolve: budgetsQueryResolver,
};

export const budgetQuery = {
    type: budgetType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: budgetQueryResolver,
};
