import budget from '../../models/budget.js';
import db from '../../models/index.js';

export const verifyBalance = async(balance, account_id) => {
    
    const otherBudgets = await db.Budget.findAll({where: {accountId: account_id,}});

    const account = await db.Account.findOne({where: {id: account_id}});

    let sum = 0;
    for (const budget of otherBudgets) {
        sum += budget.balance;
    } 

    if (balance > account.balance - sum)
        return account.balance - sum;
    else
        return balance
}

export const createBudget = async (budget, accountId) => {

    const balance = await verifyBalance(budget.balance, accountId);

    if ( balance === 0){
        console.log('Zero funds for this account left, try another one');
        return false;
    }

    const createdAccount = await db.Budget.create({
        name: budget.name,
        balance: balance,
        accountId: accountId,
    });

    return createdAccount;
}
