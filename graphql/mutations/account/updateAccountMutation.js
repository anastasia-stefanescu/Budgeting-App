import graphql from 'graphql';
import accountInputType from '../../types/accountInputType.js';
import accountType from '../../types/accountType.js';
import db from '../../../models/index.js';

const updateAccountMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id && context.user_id === account.user_id
   
    if(!isAuthorized) {
        console.log("Not authorized");
        return false;
    }

    const id = args.id;

    const account = await db.Account.findOne({
        where: {
            id,
        }
    });

    if(!account) {
        return false;
    }

    const updatedAccount = await account.update({
        ...args.account,
    });

    return updatedAccount;
}

const updateAccountMutation = {
    type: accountType,
    args: {
        id: {type: graphql.GraphQLInt},
        account: {type: accountInputType},
    },
    resolve: updateAccountMutationResolver,
};

export default updateAccountMutation;