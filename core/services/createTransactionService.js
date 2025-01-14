import db from '../../models/index.js';

async function verify(amount, budget, account, recipient_iban) {
    const recipient = await db.Account.findOne({where: {IBAN: recipient_iban}});
    if (!recipient) {
        console.log('Recipient does not exist!');
        return false;
    }

    if (budget) {
        console.log('budget balance', budget.balance);
        if (amount > budget.balance) {
            console.log('Not enough money in budget!');
            return false;
        }
    }

    console.log('account balance', account.balance);
    if (amount > account.balance) {
        console.log('Not enough money in account!');
        return false;
    }

    if(budget) {
        await budget.update({balance: budget.balance - amount});
    }
    await account.update({balance: account.balance - amount});
    await recipient.update({balance: recipient.balance + amount});

    return true;
}

export const createTransaction = async (transaction, account, budget) => {
    let budget_id;
    if(!budget)
        budget_id = null;
    else
        budget_id = budget.id;


    const result = await verify(transaction.amount, budget, account, transaction.recipient)
    console.log(result);

    if (!result) {
        console.log('Transaction failed!');
        return false;
    }

    const current_date = new Date().toISOString();

    const createdTransaction = await db.Transaction.create({
        description: transaction.description,
        date: current_date,
        amount: transaction.amount,
        recipient: transaction.recipient,
        accountId: account.id,
        budgetId: budget_id
    });

    return createdTransaction;
}