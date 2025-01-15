import graphql from 'graphql';
import { GraphQLInt } from 'graphql';
import budgetInputType from '../../types/budgetInputType.js';
import budgetType from '../../types/budgetType.js';
import db from '../../../models/index.js';

export const verifyBalance = async(id, balance, account_id) => {
    
    const other = await db.Budget.findAll({where: {accountId: account_id,}});
    const otherBudgets = other.filter(budget => budget.id !== id);
    const account = await db.Account.findOne({where: {id: account_id}});

    let sum = 0;
    for (const budget of otherBudgets) {
        sum += budget.balance;
    } 

    console.log('trying with balance: ', balance);
    console.log('account balance', account.balance);
    console.log('sum', sum);
    
    if (balance > account.balance - sum)
        return account.balance - sum;
    else
        return balance
}

const updateBudgetMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id && !!context.account_id && !!context.budget_id;
   
    if(!isAuthorized) {
        console.log('Not authorized');
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

    console.log('budget.accountId', budget.accountId, 'context.account_id', context.account_id);
    if ( budget.accountId !== Number(context.account_id))
        {
            console.log ("Accounts can only update their own budgets");
            return false;
        }

    const balance = await verifyBalance(args.id, args.budget.balance, context.account_id);

    if ( balance === 0){
        console.log('Zero funds for this account left, try another one');
        return false;
    }

    const updatedBudget = await budget.update({
        name: args.budget.name,
        balance: balance,
    });

    return updatedBudget;
}

const updateBudgetMutation = {
    type: budgetType,
    args: {
        id: {type: GraphQLInt},
        budget: {type: budgetInputType},
    },
    resolve: updateBudgetMutationResolver,
};

export default updateBudgetMutation;