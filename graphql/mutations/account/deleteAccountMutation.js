import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../../models/index.js';

const deleteAccountResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;
   
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
    if (account.userId !== context.user_id)
    {
        console.log ("Users can only delete their own accounts");
        return false;
    }

    const allBudgets = await db.Budget.findAll({where: {accountId: account.id}});
    for (const b of allBudgets)
    {
        
        await b.destroy();
    }
    const allTransactions = await db.Transaction.findAll({where: {accountId: account.id}});
    for (const t of allTransactions)
    {
        await t.destroy();
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