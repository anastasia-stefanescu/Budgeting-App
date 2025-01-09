import { GraphQLObjectType } from 'graphql';
import { userQuery, usersQuery } from '../queries/userQueries.js';
import { accountQuery, accountsQuery } from '../queries/accountQueries.js';
import { budgetQuery, budgetsQuery } from '../queries/budgetQueries.js';
import { transactionQuery, transactionsQuery } from '../queries/transactionQueries.js';
import { groupQuery } from '../queries/groupQueries.js';
import { groupBudgetQuery, groupBudgetsQuery } from '../queries/groupBudgetQueries.js';
import { groupTransferQuery, groupTransfersQuery } from '../queries/groupTransferQueries.js';
import { memberQuery, membersQuery } from '../queries/memberQueries.js';

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
    },
});


export default queryType;