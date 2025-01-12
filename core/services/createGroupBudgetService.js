import db from '../../models/index.js';

export const createGroupBudget = async (budget, context) => {
    const createdBudget = await db.GroupBudget.create({
        description: budget.description,
        amount: budget.amount,
        amountPaid: budget.userContribution,
        userContribution: budget.userContribution,
        accountId: context.account_id,
        groupId: context.group_id,
    });

    return createdBudget;
};