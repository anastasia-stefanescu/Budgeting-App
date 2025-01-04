import { GraphQLList, GraphQLInt } from 'graphql';
import transactionType from '../types/transactionType.js';
import db from '../../models/index.js';

const transactionsQueryResolver = async () => {
    const transactions = await db.Transaction.findAll();

    return transactions;
}

const transactionQueryResolver = async (_, { id }) => {
    const transaction = await db.Transaction.findOne({
        where: {
            id,
        }
    });

    if(!transaction) {
        return null;
    }

    return transaction;
}

export const transactionsQuery = {
    type: new GraphQLList(transactionType),
    resolve: transactionsQueryResolver,
};
//export default

export const transactionQuery = {
    type: transactionType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: transactionQueryResolver,
};

//export default transactionQuery;