
import budgetType from '../../types/budgetType.js';
import budgetInputType from '../../types/budgetInputType.js';

const createBudgetMutationResolver = async (_, { budget }, context) => {
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
        console.log("Not authorized");
        return false;
    }

    const createdBudget = await db.Budget.create({
        name: budget.name,
        Balance: budget.Balance,
    });

    return createdBudget;   
}

const createBudgetMutation = {
    type: budgetType,
    args: {
        budget: {type: budgetInputType},
    },
    resolve: createBudgetMutationResolver,
};

export default createBudgetMutation;