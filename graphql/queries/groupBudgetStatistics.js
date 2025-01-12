import { GraphQLList, GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import userType from '../types/userType.js';
import userContributionType from '../types/userContributionType.js';
import groupBudgetStatisticsType from '../types/groupBudgetStatisticsType.js';

//get a list of users that have paid for a budget
const budgetPaidListResolver = async (_, { budgetId }) => {
    const budget = await db.GroupBudget.findOne({
        where: { id: budgetId },
    });
    if(!budget) 
        return null;

    const transfers = await db.GroupTransfer.findAll({
        where: { budgetId: budgetId },
    });
    
    //for every transfer get the user ids associated with the accounts
    let userIds = new Map();
    for(const transfer of transfers) {
        const account = await db.Account.findOne({
            where: { id: transfer.accountId },
        });

        if(userIds.has(account.userId))
            userIds.set(account.userId, userIds.get(account.userId) + transfer.amount);
        else
            userIds.set(account.userId, transfer.amount);
    }

    //add the budget owner to the list
    const ownerAcc = await db.Account.findOne({
        where: { id: budget.accountId },
    });
    if(userIds.has(ownerAcc.userId))
        userIds.set(ownerAcc.userId, userIds.get(ownerAcc.userId) + budget.userContribution);
    else
        userIds.set(ownerAcc.userId, budget.userContribution);

    //get the user objects
    let users = [];
    for(const userId of userIds) {
        const user = await db.User.findOne({
            where: { id: userId[0] },
        });
        users.push({id: user.id, name: user.name, contribution: userId[1]});
    }

    return users;
};

//get a list of users that have not paid for a budget
const budgetUnpaidListResolver = async (_, { budgetId }) => {
    const budget = await db.GroupBudget.findOne({
        where: { id: budgetId },
    });
    if(!budget) 
        return null;

    const transfers = await db.GroupTransfer.findAll({
        where: { budgetId: budgetId },
    });

    //get all the user ids associated with the group
    let userIds = new Set();
    const members = await db.Member.findAll({
        where: { groupId: budget.groupId },
    });
    for(const member of members) {
        userIds.add(member.userId);
    }
    
    //for every transfer remove the user ids associated with the accounts
    for(const transfer of transfers) {
        const account = await db.Account.findOne({
            where: { id: transfer.accountId },
        });

        userIds.delete(account.userId);
    }

    //remove the budget owner from the list
    const ownerAcc = await db.Account.findOne({
        where: { id: budget.accountId },
    });
    userIds.delete(ownerAcc.userId);

    //get the user objects
    let users = [];
    for(const userId of userIds) {
        const user = await db.User.findOne({
            where: { id: userId },
        });

        users.push(user);
    }

    return users;
};

const budgetStatisticsResolver = async (_, { budgetId }) => {
    const budget = await db.GroupBudget.findOne({
        where: { id: budgetId },
    });
    if(!budget) 
        return null;

    const procPaid = (budget.amountPaid / budget.amount) * 100;

    const transfers = await db.GroupTransfer.findAll({
        where: { budgetId: budgetId },
    });

    let userIds = new Set();
    for(const transfer of transfers) {
        const account = await db.Account.findOne({
            where: { id: transfer.accountId },
        });

        userIds.add(account.userId);
    }
    
    const ownerAcc = await db.Account.findOne({
        where: { id: budget.accountId },
    });
    userIds.add(ownerAcc.userId);

    const numberPaid = userIds.size;

    userIds.clear();
    const members = await db.Member.findAll({
        where: { groupId: budget.groupId },
    });
    for(const member of members) {
        userIds.add(member.userId);
    }

    const numberUnpaid = userIds.size - numberPaid;

    const overBudget = 0;
    if(budget.amountPaid > budget.amount)
        overBudget = budget.amountPaid - budget.amount;

    return {
        id: budget.id,
        description: budget.description,
        amount: budget.amount,
        amountPaid: budget.amountPaid,
        userContribution: budget.userContribution,
        numberPaid,
        numberUnpaid,
        procPaid,
        overBudget,
    };
};

export const budgetPaidListQuery = {
    type: new GraphQLList(userContributionType),
    args: {
        budgetId: { type: GraphQLInt },
    },
    resolve: budgetPaidListResolver,
};

export const budgetUnpaidListQuery = {
    type: new GraphQLList(userType),
    args: {
        budgetId: { type: GraphQLInt },
    },
    resolve: budgetUnpaidListResolver,
};

export const budgetStatisticsQuery = {
    type: groupBudgetStatisticsType,
    args: {
        budgetId: { type: GraphQLInt },
    },
    resolve: budgetStatisticsResolver,
};