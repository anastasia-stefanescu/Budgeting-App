import groupTransferType from '../../types/groupTransferType.js';
import groupTransferInputType from '../../types/groupTransferInputType.js';
import db from '../../../models/index.js';

const createGroupTransferMutationResolver = async (_, { groupTransfer }, context) => {
    const isAuthorized = !!context.user_id;
    if(!isAuthorized)
        return false;

    //check if group budget exists
    const groupBudget = await db.GroupBudget.findOne({
        where: { id: context.group_budget_id },
    });
    if(!groupBudget)
        return false;

    //check if user is member in group
    const inGroup = await db.Member.findOne({
        where: {
           userId: context.user_id,
           groupId: groupBudget.groupId,
       },
    });
    if(!inGroup)
        return false;

    //check if accounts exist
    const fromAccount = await db.Account.findOne({
        where: { id: context.account_id },
    });
    const toAccount = await db.Account.findOne({
        where: { id: groupBudget.accountId },
    });
    if(!fromAccount || !toAccount)
        return false;

    //check if user has enough money in account
    if(fromAccount.balance < groupTransfer.amount)
        return false;

    //transfer money between accounts and update group budget
    await fromAccount.update({
        balance: fromAccount.balance - groupTransfer.amount,
    });
    await toAccount.update({
        balance: toAccount.balance + groupTransfer.amount,
    });
    await groupBudget.update({
        amountPaid: groupBudget.amountPaid + groupTransfer.amount,
    });

    const createdGroupTransfer = await db.GroupTransfer.create({
        amount: groupTransfer.amount,
        accountId: context.account_id,
        budgetId: context.group_budget_id,
    });

    return createdGroupTransfer;   
};

const createGroupTransferMutation = {
    type: groupTransferType,
    args: {
        groupTransfer: {type: groupTransferInputType},
    },
    resolve: createGroupTransferMutationResolver,
};

export default createGroupTransferMutation;