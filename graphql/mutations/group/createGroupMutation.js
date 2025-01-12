import groupType from '../../types/groupType.js';
import groupInputType from '../../types/groupInputType.js';
import { createGroup } from '../../../core/services/createGroupService.js';

const createGroupMutationResolver = async (_, { group }, context) => {
    const isAuthorized = !!context.user_id
    if(!isAuthorized) {
        console.log("Not authorized");
        return false;
    }

    const createdGroup = await createGroup(group, context);

    return createdGroup;   
}

const createGroupMutation = {
    type: groupType,
    args: {
        group: {type: groupInputType},
    },
    resolve: createGroupMutationResolver,
};

export default createGroupMutation;