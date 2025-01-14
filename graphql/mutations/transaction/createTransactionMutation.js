
import transactionType from '../../types/transactionType.js';
import transactionInputType from '../../types/transactionInputType.js';
import { createTransaction } from '../../../core/services/createTransactionService.js';
import db from '../../../models/index.js';

const createTransactionMutationResolver = async (_, { transaction }, context) => {
    
    const isAuthorized = !!context.user_id && !!context.account_id; // the account is mandatory

    if (!isAuthorized) {
        console.log('Not authorized');
        return null;
    }

    let budget = null;
    if (!!context.budget_id) { // verify if a budget also exists
        const source = context.budget_id;

        const found_budget = await db.Budget.findOne({
            where: {
                id: source
            }
        })
        if (!found_budget){
            console.log('Budget does not exist');
            return false;
        }

        if (found_budget.accountId !== Number(context.account_id)){
            console.log('Budget does not belong to account');
            return false;
        }

        budget = found_budget;
    }  
    
    //now verify the account is correct
    const accountId = context.account_id;
    const account = await db.Account.findOne({
        where: {
            id: accountId
        }
    })

    if (!account){
        console.log('Account does not exist');
        return false;
    }

    if (account.userId !== Number(context.user_id)){
        console.log('Account does not belong to user');
        return false;
    }
    
    const createdTransaction = await createTransaction(transaction, account, budget);
    
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