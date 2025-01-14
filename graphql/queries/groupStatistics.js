import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import groupStatisticsType from '../types/groupStatisticsType.js';
import userGroupContributionType from '../types/userGroupContributionType.js';

const groupStatisticsResolver = async (_, { groupId }) => {
    const group = await db.Group.findOne({
        where: { id: groupId },
    });
    if(!group) 
        return null;

    //calculate how much of all budgets has been paid
    //calculate how many budgets have been paid
    let totalBudget = 0;
    let totalBudgetPaid = 0;
    let nrBudgetsPaid = 0;
    let nrBudgets = 0;

    const budgets = await db.GroupBudget.findAll({
        where: { groupId: groupId },
    });

    for(const budget of budgets) {
        totalBudget += budget.amount;
        totalBudgetPaid += budget.amountPaid;
        if(budget.amountPaid >= budget.amount)
            nrBudgetsPaid++;
        nrBudgets++;
    }

    let procPaid = Math.trunc(totalBudgetPaid / totalBudget * 100);
    let procBudgetsPaid = Math.trunc(nrBudgetsPaid / nrBudgets * 100);

    //calculate number of members
    const members = await db.Member.findAll({
        where: { groupId: groupId },
    });
    let nrMembers = members.length;

    return {
        id: group.id,
        name: group.name,
        description: group.description,
        totalBudget,
        totalBudgetPaid,
        procPaid,
        nrBudgets,
        nrBudgetsPaid,
        procBudgetsPaid,
        nrMembers,
    };
};

const groupUserStatisticsResolver = async (_, { groupId }) => {
    const group = await db.Group.findOne({
        where: { id: groupId },
    });
    if(!group) 
        return null;

    const budgets = await db.GroupBudget.findAll({
        where: { groupId: groupId },
    });
    const nrBudgets = budgets.length;

    const members = await db.Member.findAll({
        where: { groupId: groupId },
    });

    let usersMap = new Map();
    for(const member of members)
        usersMap.set(member.userId, [0, 0])

    for(const budget of budgets) {
        const transfers = await db.GroupTransfer.findAll({
            where: { budgetId: budget.id },
        });

        for(const transfer of transfers) {
            const account = await db.Account.findOne({
                where: { id: transfer.accountId },
            });
            usersMap.set(account.userId, [usersMap.get(account.userId)[0] + transfer.amount, usersMap.get(account.userId)[1] + 1]);
        }
    }

    let users = [];
    for(const userId of usersMap.keys()) {
        const user = await db.User.findOne({
            where: { id: userId },
        });
        users.push({id: userId, name: user.name, totalContribution: usersMap.get(userId)[0], nrBudgetsPaid: usersMap.get(userId)[1], procBudgetsPaid: Math.trunc(usersMap.get(userId)[1] / nrBudgets * 100)});
    }

    return users;
};

export const groupStatisticsQuery = {
    type: groupStatisticsType,
    args: {
        groupId: { type: GraphQLInt },
    },
    resolve: groupStatisticsResolver,
};

export const groupUserStatisticsQuery = {
    type: new GraphQLList(userGroupContributionType),
    args: {
        groupId: { type: GraphQLInt },
    },
    resolve: groupUserStatisticsResolver,
};