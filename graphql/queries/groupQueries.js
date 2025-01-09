import { GraphQLInt } from 'graphql';
import db from '../../models/index.js';
import groupType from '../types/groupType.js';

const groupQueryResolver = async (_, { id}) => {
    const group = await db.Group.FindOne({
        where: { id: id },
    });

    if(!group)
        return null;

    return group;
};

export const groupQuery = {
    type: groupType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: groupQueryResolver,
};