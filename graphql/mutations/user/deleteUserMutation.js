import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../../models/index.js';

const deleteUserResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        return false;
    }

    const user = await db.User.findOne({
        where: {
            id: args.id,
        }
    })

    if (!user) {
        return false;
    }

    const allAccounts = await db.Account.findAll({ where:{userId: user.id}});
    for (const a of allAccounts){
        const allBudgets = await db.Budget.findAll({where: {accountId: a.id}});
        for (const b of allBudgets)
        {
            await b.destroy();
        }
        const allTransactions = await db.Transaction.findAll({where: {accountId: a.id,}});
        for (const t of allTransactions)
        {
            await t.destroy();
        }
        await a.destroy();
    }
    
    await user.destroy();
    return true;
}

const deleteUserMutation = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deleteUserResolver,
};

export default deleteUserMutation;