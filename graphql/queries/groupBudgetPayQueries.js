import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import { groupBudgetPayType } from '../types/groupBudgetPayType.js';

const groupBudgetPayQueryResolver = async (_, { id }) => {
    const budgetPay = await db.GroupBudgetPay.findOne({
        where: { id: id },
    });

    if(!budgetPay) 
        return null;

    return budgetPay;
};

const groupBudgetPaysQueryResolver = async (_, { budgetId }) => {
    const budgetPays = await db.GroupBudgetPay.findAll({
        where: { budgetId },
    });

    return budgetPays;
};

const groupBudgetPayQuery = {
    type: groupBudgetPayType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: groupBudgetPayQueryResolver,
};

const groupBudgetPaysQuery = {
    type: new GraphQLList(groupBudgetPayType),
    args: {
        budgetId: { type: GraphQLInt },
    },
    resolve: groupBudgetPaysQueryResolver,
};

export default { groupBudgetPayQuery, groupBudgetPaysQuery };