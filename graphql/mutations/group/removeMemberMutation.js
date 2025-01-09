import groupType from '../../types/groupType.js';
import db from '../../../models/index.js';
import { GraphQLInt } from 'graphql';

const removeMemberMutationResolver = async (_, { groupId, userId }, context) => {
    const isAuthorized = !!context.user_id
    if(!isAuthorized)
        return false;

    const group = await db.Group.findOne({
        where: { id: groupId }
    });
    if(!group) 
        return false;

    //check if user is member in group
    const inGroup = await db.Member.findOne({
        where: {
            userId: context.user_id,
            groupId: groupId,
        },
    });
    if(!inGroup)
        return false;

    //check if user to be removed is in group
    const userInGroup = await db.Member.findOne({
        where: {
            userId: userId,
            groupId: groupId,
        },
    });
    if(!userInGroup)
        return false;

    group.removeUser(userId);

    const updatedGroup = await db.Group.findOne({
        where: { id: groupId}
    });

    return updatedGroup;
}

const removeMemberMutation = {
    type: groupType,
    args: {
        groupId: {type: GraphQLInt},
        userId: {type: GraphQLInt},
    },
    resolve: removeMemberMutationResolver,
};

export default removeMemberMutation;