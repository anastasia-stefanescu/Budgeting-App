
import budgetType from '../../types/budgetType.js';
import budgetInputType from '../../types/budgetInputType.js';
import { createBudget } from '../../../core/services/createBudgetService.js';

const createBudgetMutationResolver = async (_, { budget }, context) => {
    const isAuthorized = !!context.account_id
   
    if(!isAuthorized) {
        console.log("Not authorized");
        return false;
    }
    const account = await db.Account.findOne({
        where: {
            id: context.accountId
        }
    })
    //console.log(account);

    const createdBudget = await createBudget(budget, context);

    return createdBudget;   
}

const createBudgetMutation = {
    type: budgetType,
    args: {
        budget: {type: budgetInputType},
    },
    resolve: createBudgetMutationResolver,
};

export default createBudgetMutation;