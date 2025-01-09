import groupBudget from '../models/groupBudget';
import db from '../models/index';

export const createGroupBudget = async (budget, context) => {
    const createdBudget = await db.GroupBudget.create({
        description: budget.description,
        amount: budget.amount,
        userContribution: budget.userContribution,
        accountId: context.account_id,
        groupId: context.group_id,
    });

    return createdBudget;
};