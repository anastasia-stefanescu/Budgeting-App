import { GraphQLObjectType } from 'graphql';
import { userQuery, usersQuery } from '../queries/userQueries.js';
import { accountQuery, accountsQuery } from '../queries/accountQueries.js';
import { budgetQuery, budgetsQuery } from '../queries/budgetQueries.js';
import { transactionQuery, transactionsQuery } from '../queries/transactionQueries.js';

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
        transactions: transactionsQuery
    },
});


export default queryType;