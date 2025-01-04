import { GraphQLList, GraphQLInt } from 'graphql';
import accountType from '../types/accountType.js'; // Replace with the correct path to your account type definition
import db from '../../models/index.js';

const accountsQueryResolver = async () => {
    const accounts = await db.Account.findAll();

    return accounts;
}

const accountQueryResolver = async (_, { id }) => {
    const account = await db.Account.findOne({
        where: {
            id,
        }
    });

    if (!account) {
        return null;
    }

    return account;
}

export const accountsQuery = {
    type: new GraphQLList(accountType),
    resolve: accountsQueryResolver,
};

export const accountQuery = {
    type: accountType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: accountQueryResolver,
};
