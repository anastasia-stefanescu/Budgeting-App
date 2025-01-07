import {GraphQLBoolean, GraphQLInt} from 'graphql';
import db from '../../../models/index.js';

const deleteBudgetResolver = async (_, args, context) => {
    const isAuthorized = !!context.account_id
   
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
    if (budget.accountId !== context.account_id)
        {
            console.log ("Accounts can only delete their own budgets");
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