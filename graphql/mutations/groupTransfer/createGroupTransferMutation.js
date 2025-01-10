import groupTransferType from '../../types/groupTransferType.js';
import groupTransferInputType from '../../types/groupTransferInputType.js';

const createGroupTransferMutationResolver = async (_, { groupTransfer }, context) => {
    const isAuthorized = !!context.user_id;
    if(!isAuthorized)
        return false;

    //check if user is member in group
    const inGroup = await db.Member.findOne({
         where: {
            userId: context.user_id,
            groupId: context.group_id,
        },
    });
    if(!inGroup)
        return false;

    const groupBudget = await db.GroupBudget.findOne({
        where: { id: context.groupBudget_id },
    });
    if(!groupBudget)
        return false;

    const fromAccount = await db.Account.findOne({
        where: { id: context.account_id },
    });
    const toAccount = await db.Account.findOne({
        where: { id: groupBudget.accountId },
    });
    if(!fromAccount || !toAccount)
        return false;

    //check if user has enough money in account
    if(fromAccount.amount < groupTransfer.amount)
        return false;

    //transfer money between accounts and update group budget
    await fromAccount.update({
        amount: fromAccount.amount - groupTransfer.amount,
    });
    await toAccount.update({
        amount: toAccount.amount + groupTransfer.amount,
    });
    await groupBudget.update({
        amountPaid: groupBudget.amountPaid + groupTransfer.amount,
    });

    const createdGroupTransfer = await createGroupTransfer(groupTransfer, context);

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