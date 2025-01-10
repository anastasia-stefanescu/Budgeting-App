import groupBudgetType from '../../types/groupBudgetType.js';
import groupBudgetInputType from '../../types/groupBudgetInputType.js';
import { createGroupBudget } from '../../../core/services/createGroupBudgetService.js';
import db from '../../../models/index.js';

const createGroupBudgetMutationResolver = async (_, { groupBudget }, context) => {
    console.log(context);
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

    const createdGroupBudget = await createGroupBudget(groupBudget, context);

    return createdGroupBudget;   
}

const createGroupBudgetMutation = {
    type: groupBudgetType,
    args: {
        groupBudget: {type: groupBudgetInputType},
    },
    resolve: createGroupBudgetMutationResolver,
};

export default createGroupBudgetMutation;