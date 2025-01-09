import graphql from 'graphql';
import groupInputType from '../../types/groupInputType.js';
import groupType from '../../types/groupType.js';
import db from '../../../models/index.js';

const updateGroupMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;
    if(!isAuthorized)
        return false;
    
    const id = args.id;
    const group = await db.Group.findOne({
        where: { id }
    });
    if(!group)
        return false;

    //check if user is member in group
    const inGroup = await db.Member.findOne({
        where: {
            userId: context.user_id,
            groupId: id,
        },
    });
    if(!inGroup) {
        console.log("Only members of the group can update the group");
        return false;
    }

    const updatedGroup = await group.update({
        ...args.group,
    });

    return updatedGroup;
}

const updateGroupMutation = {
    type: groupType,
    args: {
        id: {type: graphql.GraphQLInt},
        group: {type: groupInputType},
    },
    resolve: updateGroupMutationResolver,
};

export default updateGroupMutation;