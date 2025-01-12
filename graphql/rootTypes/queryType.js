import { GraphQLObjectType } from 'graphql';
import { userQuery, usersQuery } from '../queries/userQueries.js';
import { accountQuery, accountsQuery } from '../queries/accountQueries.js';
import { budgetQuery, budgetsQuery } from '../queries/budgetQueries.js';
import { transactionQuery, transactionsQuery } from '../queries/transactionQueries.js';
import { groupQuery } from '../queries/groupQueries.js';
import { groupBudgetQuery, groupBudgetsQuery } from '../queries/groupBudgetQueries.js';
import { groupTransferQuery, groupTransfersQuery } from '../queries/groupTransferQueries.js';
import { memberQuery, membersQuery } from '../queries/memberQueries.js';
import { budgetPaidListQuery, budgetUnpaidListQuery, budgetStatisticsQuery } from '../queries/groupBudgetStatistics.js';
import { groupStatisticsQuery, groupUserStatisticsQuery } from '../queries/groupStatistics.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,
        account: accountQuery,
        accounts: accountsQuery,
        budget: budgetQuery,
        budgets: budgetsQuery,
        transaction: transactionQuery,
        transactions: transactionsQuery,
        group: groupQuery,
        groupBudget: groupBudgetQuery,
        groupBudgets: groupBudgetsQuery,
        groupTransfer: groupTransferQuery,
        groupTransfers: groupTransfersQuery,
        member: memberQuery,
        members: membersQuery,
        budgetPaidList: budgetPaidListQuery,
        budgetUnpaidList: budgetUnpaidListQuery,
        budgetStatistics: budgetStatisticsQuery,
        groupStatistics: groupStatisticsQuery,
        groupUserStatistics: groupUserStatisticsQuery,
    },
});


export default queryType;