import { GraphQLObjectType } from 'graphql';
import { userQuery, usersQuery } from '../queries/userQueries.js';
import { accountQuery, accountsQuery } from '../queries/accountQueries.js';
import { budgetQuery, budgetsQuery } from '../queries/budgetQueries.js';
import { transactionQuery, transactionsQuery } from '../queries/transactionQueries.js';
import { groupQuery } from '../queries/groupQueries.js';
import { groupBudgetQuery, groupBudgetsQuery } from '../queries/groupBudgetQueries.js';
import { groupTransferQuery, groupTransfersQuery } from '../queries/groupTransferQueries.js';
import { memberQuery, membersQuery } from '../queries/memberQueries.js';
import { groupBudgetPaidListQuery, groupBudgetUnpaidListQuery, groupBudgetStatisticsQuery } from '../queries/groupBudgetStatistics.js';
import { groupStatisticsQuery, groupUserStatisticsQuery } from '../queries/groupStatistics.js';
import { accountStatisticsQuery } from '../queries/accountStatisticsQuery.js';
import { transactionsStatisticsQuery } from '../queries/transactionsStatisticsQuery.js';
import { budgetStatisticsQuery } from '../queries/budgetStatisticsQuery.js';

const queryType = new GraphQLObjectType({
    name: "Query",
    fields: {
        user: userQuery,
        users: usersQuery,

        account: accountQuery,
        accounts: accountsQuery,
        accountStatistics: accountStatisticsQuery,

        budget: budgetQuery,
        budgets: budgetsQuery,
        budgetStatistics: budgetStatisticsQuery,

        transaction: transactionQuery,
        transactions: transactionsQuery,
        transactionsStatistics: transactionsStatisticsQuery,

        group: groupQuery,
        groupBudget: groupBudgetQuery,
        groupBudgets: groupBudgetsQuery,
        groupTransfer: groupTransferQuery,
        groupTransfers: groupTransfersQuery,

        member: memberQuery,
        members: membersQuery,

        groupBudgetPaidList: groupBudgetPaidListQuery,
        groupBudgetUnpaidList: groupBudgetUnpaidListQuery,

        groupBudgetStatistics: groupBudgetStatisticsQuery,
        groupStatistics: groupStatisticsQuery,
        groupUserStatistics: groupUserStatisticsQuery,
    },
});


export default queryType;