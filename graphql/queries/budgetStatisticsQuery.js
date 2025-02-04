import budgetStatisticsType from "../types/budgetStatisticsType.js";
import db from "../../models/index.js";
import { GraphQLInt } from "graphql";

//initial balance, current balance

// number transactions

const budgetStatisticsQueryResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id && !!context.account_id && !!context.budget_id;

    if (!isAuthorized) {
        console.log("Not authorized");
        return false;
    }
    const budget = await db.Budget.findOne({ where: { id: args.budgetId } });
    if (!budget) {
        return false;
    }
    if (budget.accountId !== Number(context.account_id)) {
        console.log("Accounts can only see their own budgets");
        return false;
    }

    const transactions = await db.Transaction.findAll({ where: { budgetId: args.budgetId } });

    let amountPaidByBudget = 0;
    for (const transaction of transactions) {
        amountPaidByBudget += transaction.amount;
    }

    const initialBalance = budget.balance + amountPaidByBudget;
    const currentBalance = budget.balance;

    const budgetStatistic = {
        id: budget.id,
        initialBalance : initialBalance,
        currentBalance: currentBalance,
        numberTransactions: transactions.length,
    };

    return budgetStatistic;

    }

export const budgetStatisticsQuery = {
    type: budgetStatisticsType,
    args: {
        budgetId: { type: GraphQLInt },
    },
    resolve: budgetStatisticsQueryResolver,
};