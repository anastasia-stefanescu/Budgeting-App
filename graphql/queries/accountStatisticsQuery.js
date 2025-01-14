import { accountStatisticsType } from "../types/accountStatisticsType.js";
import transaction from "../../models/transaction.js";
import db from "../../models/index.js";
import { GraphQLInt } from "graphql";

//initial balance, current balance

// number of budgets
// initial sum of budgets
// current sum of budgets

// number + amount of incoming/outgoing transactions

const accountStatisticsQueryResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id && !!context.account_id;

    if (!isAuthorized) {
        console.log("Not authorized");
        return false;
    }
    const account = await db.Account.findOne({ where: { id: args.accountId } });
    if (!account) {
        return false;
    }
    if (account.userId !== Number(context.user_id)) {
        console.log("Users can only see their own accounts");
        return false;
    }

    const budgets = await db.Budget.findAll({ where: { accountId: args.accountId } });

    const outgoingTransactions = await db.Transaction.findAll({ where: { accountId: args.accountId } });

    const incomingTransactions = await db.Transaction.findAll({ where: { recipient: account.IBAN } });

    // call budget statistics query
    //const bugdetsTransactions = await db.Transaction.findAll({ where: { accountId: args.accbudgetId: budgets.id } });

    let amountPaidByAccount = 0;
    for (const outgoing of outgoingTransactions) {
        amountPaidByAccount += outgoing.amount;
    }

    let amountReceivedByAccount = 0;
    for (const incoming of incomingTransactions) {
        amountReceivedByAccount += incoming.amount;
    }

    let currentBalanceOfBudgets = 0;
    for (const budget of budgets) {
        currentBalanceOfBudgets += budget.balance;
    }

    const initialBalance = account.balance + amountPaidByAccount - amountReceivedByAccount;
    const currentBalance = account.balance;

    const numberOfIncomingTransactions = incomingTransactions.length;
    const numberOfOutgoingTransactions = outgoingTransactions.length;
    const amountOfIncomingTransactions = amountReceivedByAccount;
    const amountOfOutgoingTransactions = amountPaidByAccount;


    const accountStatistic = {
        id: account.id,
        initialBalance : initialBalance,
        currentBalance: currentBalance,
        incomingTransactions: numberOfIncomingTransactions,
        outgoingTransactionsutgoingTransactions: numberOfOutgoingTransactions,
        incomingSum: amountOfIncomingTransactions,
        outgoingSum: amountOfOutgoingTransactions,
        numberOfBudgets: budgets.length,
    };

    return accountStatistic;

    }


    




// get a list of transactions made by account
export const accountStatisticsQuery = {
    type: accountStatisticsType,
    args: {
        accountId: { type: GraphQLInt },
    },
    resolve: accountStatisticsQueryResolver,
};