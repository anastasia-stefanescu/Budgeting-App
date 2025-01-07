
import accountType from '../../types/accountType.js';
import accountInputType from '../../types/accountInputType.js';

import { createAccount } from '../../../core/services/createAccountService.js';



const createAccountMutationResolver = async (_, { account }, context) => {
    const isAuthorized = !!context.user_id && context.user_id === account.user_id
   
    if(!isAuthorized) {
        console.log("Not authorized");
        return false;
    }

    const createdAccount = await createAccount(account, context);

    
    return createdAccount;   
}

const createAccountMutation = {
    type: accountType,
    args: {
        account: {type: accountInputType},
    },
    resolve: createAccountMutationResolver,
};

export default createAccountMutation;