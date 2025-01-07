import graphql from 'graphql';
import budgetInputType from '../../types/budgetInputType.js';
import budgetType from '../../types/budgetType.js';
import db from '../../../models/index.js';

const updateBudgetMutationResolver = async (_, args) => {
    const isAuthorized = !!context.account_id
   
    if(!isAuthorized) {
        return false;
    }
    
    const id = args.id;

    const budget = await db.Budget.findOne({
        where: {
            id,
        }
    });

    if(!budget) {
        return false;
    }
    if (budget.accountId !== context.account_id)
        {
            console.log ("Accounts can only update their own budgets");
            return false;
        }


    const updatedBudget = await budget.update({
        ...args.budget,
    });

    return updatedBudget;
}

const updateBudgetMutation = {
    type: budgetType,
    args: {
        id: {type: graphql.GraphQLInt},
        budget: {type: budgetInputType},
    },
    resolve: updateBudgetMutationResolver,
};

export default updateBudgetMutation;