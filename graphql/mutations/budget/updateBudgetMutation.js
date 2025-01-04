import graphql from 'graphql';
import budgetInputType from '../../types/budgetInputType.js';
import budgetType from '../../types/budgetType.js';
import db from '../../../models/index.js';

const updateBudgetMutationResolver = async (_, args) => {
    const account = await db.Account.findOne({
        where: {
            id: budget.accountId
        }
    })
    console.log(account);

    const user = await db.User.findOne({ where: {
        id: account.userId
    }});

    const isAuthorized = !!context.user_id && context.user_id === user.id
   
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