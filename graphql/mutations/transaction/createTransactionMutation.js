
import transactionType from '../../types/transactionType.js';
import transactionInputType from '../../types/transactionInputType.js';
import { createTransaction } from '../../../core/services/createTransactionService.js';

const createTransactionMutationResolver = async (_, { transaction }, context) => {
    //verify that one of account or budget exists
    
    const createdTransaction = await createTransaction(transaction, context);
    
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