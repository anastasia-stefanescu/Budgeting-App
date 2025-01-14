import { GraphQLInt, GraphQLList } from 'graphql';
import db from '../../models/index.js';
import userType from '../types/userType.js';

const memberQueryResolver = async (_, { userId, groupId }) => {
    const member = await db.Member.findOne({
        where: { userId, groupId },
    });

    if(!member) 
        return null;

    const account = await db.User.findOne({
        where: { id: userId },
    });

    return account;
};

const membersQueryResolver = async (_, { groupId }) => {
    const members = await db.Member.findAll({
        where: { groupId: groupId },
    });

    if(!members)
        return null;

    let accounts = [];

    for(let member of members) {
        const account = await db.User.findOne({
            where: { id: member.userId },
        });

        accounts.push(account);
    }

    return accounts;
};

export const memberQuery = {
    type: userType,
    args: {
        userId: { type: GraphQLInt },
        groupId: { type: GraphQLInt },
    },
    resolve: memberQueryResolver,
};

export const membersQuery = {
    type: new GraphQLList(userType),
    args: {
        groupId: { type: GraphQLInt },
    },
    resolve: membersQueryResolver,
};