import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../../models/index.js';

const deleteBudgetResolver = async (_, args, context) => {
    const account = await db.Account.findOne({
        where: {
            id: budget.accountId
        }
    })
    console.log(account);

    const user = await db.User.findOne({ where: {
        id: account.userId
    }});

    const isAuthorized = !!context.user_id && context.user_id === user.id
   
   
    if(!isAuthorized) {
        return false;
    }

    const budget = await db.Budget.findOne({
        where: {
            id: args.id,
        }
    })

    if (!budget) {
        return false;
    }

    await budget.destroy();
    return true;
}

const deleteBudgetMutation = {
    type: GraphQLBoolean,
    args: {
        id: {type: GraphQLInt},
    },
    resolve: deleteBudgetResolver,
};

export default deleteBudgetMutation;