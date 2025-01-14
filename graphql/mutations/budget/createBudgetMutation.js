
import budgetType from '../../types/budgetType.js';
import budgetInputType from '../../types/budgetInputType.js';
import { createBudget } from '../../../core/services/createBudgetService.js';
import db from '../../../models/index.js';
import { INTEGER } from 'sequelize';



const createBudgetMutationResolver = async (_, { budget }, context) => {
    const isAuthorized = !!context.user_id && !!context.account_id;

    const accountId = context.account_id;
   
    if(!isAuthorized) {
        console.log("Not authorized");
        return false;
    }
    
    const account = await db.Account.findOne({
        where: {
            id: accountId
        }
    })

    if (!account){
        console.log('Account does not exist');
        return false;
    }

    if (account.userId !== context.user_id){
        console.log('Account does not belong to user');
        return false;
    }

    const createdBudget = await createBudget(budget, accountId);

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