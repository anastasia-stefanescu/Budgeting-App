
import transactionType from '../../types/transactionType.js';
import transactionInputType from '../../types/transactionInputType.js';

const createTransactionMutationResolver = async (_, { transaction }, context) => {
    const createdTransaction = await db.Transaction.create({
        Description: transaction.Description,
        Date: transaction.Date,
        Amount: transaction.Amount,
        Recipient: transaction.Recipient,
    });

    return createdTransaction;
    
}

const createTransactionMutation = {
    type: transactionType,
    args: {
        transaction: {type: transactionInputType},
    },
    resolve: createTransactionMutationResolver,
};

export default createTransactionMutation;