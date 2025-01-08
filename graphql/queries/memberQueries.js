import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import { accountType } from '../types/accountType.js';

const memberQueryResolver = async (_, { accountId, groupId }) => {
    const member = await db.Member.findOne({
        where: { accountId, groupId },
    });

    if(!member) 
        return null;

    const account = await db.Account.findOne({
        where: { id: accountId },
    });

    return account;
};

const membersQueryResolver = async (_, { groupId }) => {
    const members = await db.Member.findAll({
        where: { group: groupId },
    });

    if(!members)
        return null;

    let accounts = [];

    for(let member of members) {
        const account = await db.Account.findOne({
            where: { id: member.accountId },
        });

        accounts.push(account);
    }

    return accounts;
};

const memberQuery = {
    type: accountType,
    args: {
        accountId: { type: GraphQLInt },
        groupId: { type: GraphQLInt },
    },
    resolve: memberQueryResolver,
};

const membersQuery = {
    type: new GraphQLList(accountType),
    args: {
        groupId: { type: GraphQLInt },
    },
    resolve: membersQueryResolver,
};

export default { memberQuery, membersQuery };