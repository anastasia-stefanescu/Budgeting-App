import groupBudgetType from '../../types/groupBudgetType.js';
import groupBudgetInputType from '../../types/groupBudgetInputType.js';
import db from '../../../models/index.js';
import { GraphQLBoolean, GraphQLInt } from 'graphql';

const deleteGroupBudgetMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;
    if(!isAuthorized)
        return false;

    //check if group exists
    const group = await db.Group.findOne({
        where: { id: context.group_id },
    });
    if(!group)
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

    //check if budget exists
    const budget = await db.GroupBudget.findOne({
        where: { id: args.id }
    });
    if(!budget)
        return false;
    //check if budget belongs to group
    if(budget.groupId != context.group_id)
        return false;
    
    //check if budget belongs to user
    const account = await db.Account.findOne({
        where: { id: budget.accountId }
    });
    if(!account)
        return false;
    if(account.userId !== context.user_id)
        return false;

     const groupTransfers = await db.GroupTransfer.findAll({
        where: { budgetId: budget.id },
    });
    
    for (let j = 0; j < groupTransfers.length; j++) {
        await groupTransfers[j].destroy();
    }

    await budget.destroy();

    return true;
}

const deleteGroupBudgetMutation = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLInt},
        groupBudget: {type: groupBudgetInputType},
    },
    resolve: deleteGroupBudgetMutationResolver,
};

export default deleteGroupBudgetMutation;