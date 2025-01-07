import db from '../../models/index.js';

export const createTransaction = async (transaction, context) => {
    // have to also verify , remove money from account & budget, modify the recipient also

    const createdTransaction = await db.Transaction.create({
        Description: transaction.Description,
        Date: transaction.Date,
        Amount: transaction.Amount,
        Recipient: transaction.Recipient,
        accountId: context.account_id,
        budgetId: context.budget_id
    });

    return createdTransaction;
}