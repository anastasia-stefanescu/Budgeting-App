import transactionsStatisticsType from "../types/transactionsStatisticsType.js";
import transaction from "../../models/transaction.js";
import db from "../../models/index.js";
import { GraphQLInt, GraphQLString } from "graphql";

function compare_dates(stringdate, stringbegin, stringend) {
    const date = new Date(stringdate);
    const begin = new Date(stringbegin);
    const end = new Date(stringend);

    return date >= begin && date <= end;
}

const transactionsStatisticsQueryResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;

    if (!isAuthorized) {
        console.log("Not authorized");
        return false;
    }

    let aux_transactions;
    if (args.accountId && args.budgetId) {
        console.log( ' using account and budget');

        aux_transactions = await db.Transaction.findAll({ where: { accountId: args.accountId, budgetId: args.budgetId, }});
        
    }  else {
        if (args.accountId)  {
            console.log('  using account');
            aux_transactions = await db.Transaction.findAll({ where: { accountId: args.accountId } });
        }
        else{
            console.log('no account nor budget');
            aux_transactions = await db.Transaction.findAll();
        }
        
    }
    if (!aux_transactions) {
        return false;
    }

    const transactions = aux_transactions.filter(transaction => compare_dates(transaction.date, args.begin, args.end));

    if (!transactions) {
        console.log("No transactions found");
        return false;
    }


    let amountPaidByTransactions = 0;
    for (const transaction of transactions) {
        amountPaidByTransactions += transaction.amount;
    }

    const initialBalance = transactions.balance + amountPaidByTransactions;
    const currentBalance = transactions.balance;

    const transactionsStatistic = {
        accountId: args.accountId,
        budgetId: args.budgetId,
        numberTransactions: transactions.length,
        amount: amountPaidByTransactions,
        begin: args.begin,
        end: args.end
    };

    return transactionsStatistic;

    }

export const transactionsStatisticsQuery = {
    type: transactionsStatisticsType,
    args: {
        accountId: { type: GraphQLInt },
        budgetId: { type: GraphQLInt },
        begin: { type: GraphQLString },
        end: { type: GraphQLString },
    },
    resolve: transactionsStatisticsQueryResolver,
};