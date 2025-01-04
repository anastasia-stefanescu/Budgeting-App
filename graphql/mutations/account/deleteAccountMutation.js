import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../../models/index.js';

const deleteAccountResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id && context.user_id === account.user_id
   
    if(!isAuthorized) {
        return false;
    }

    const account = await db.Account.findOne({
        where: {
            id: args.id,
        }
    })

    if (!account) {
        return false;
    }

    await account.destroy();
    return true;
}

const deleteAccountMutation = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deleteAccountResolver,
};

export default deleteAccountMutation;