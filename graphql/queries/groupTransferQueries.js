import { GraphQLInt, GraphQLList } from 'graphql';
import db from '../../models/index.js';
import groupTransferType from '../types/groupTransferType.js';

const groupTransferQueryResolver = async (_, { id }) => {
    const transfer = await db.GroupTransfer.findOne({
        where: { id: id },
    });

    if(!transfer) 
        return null;

    return Transfer;
};

const groupTransfersQueryResolver = async (_, { budgetId }) => {
    const transfers = await db.GroupTransfer.findAll({
        where: { budgetId },
    });

    return transfers;
};

export const groupTransferQuery = {
    type: groupTransferType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: groupTransferQueryResolver,
};

export const groupTransfersQuery = {
    type: new GraphQLList(groupTransferType),
    args: {
        budgetId: { type: GraphQLInt },
    },
    resolve: groupTransfersQueryResolver,
};