import budget from '../../models/budget.js';
import db from '../../models/index.js';

export const verifyBalance = async(balance, account_id) => {
    const otherBudgets = await db.Budget.findAll();
    const account = await db.Account.findOne({where: {id: account_id}});

    let sum = 0
    for (var i = 0; i< otherBudgets.length; i++){
        sum += otherBudgets[i].balance;
    } 

    if (balance > account.balance - sum)
        return account.balance - sum;
    else
        return budget.balance
}

export const createBudget = async (budget, context) => {

    const balance = verifyBalance(budget.balance, context.account_id);
    
    const createdAccount = await db.Budget.create({
        name: budget.name,
        balance: balance,
        accountId: context.account_id,
    });

    return createdAccount;
}
