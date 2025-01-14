import { GraphQLBoolean, GraphQLInt } from "graphql";
import db from "../../../models/index.js";

const deleteGroupResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id;
    if (!isAuthorized)
        return false;

    const id = args.id;
    const group = await db.Group.findOne({
        where: { id: args.id },
    });
    if (!group)
        return false;

    //check if user is member in group
    const inGroup = await db.Member.findOne({
        where: {
            userId: context.user_id,
            groupId: id,
        },
    });
    if(!inGroup)
        return false;

    const groupBudgets = await db.GroupBudget.findAll({
        where: { groupId: id },
    });

    for (let i = 0; i < groupBudgets.length; i++) {
        const groupBudgetId = groupBudgets[i].id;
        const groupTransfers = await db.GroupTransfer.findAll({
            where: { budgetId: groupBudgetId },
        });

        for (let j = 0; j < groupTransfers.length; j++) {
            await groupTransfers[j].destroy();
        }

        await groupBudgets[i].destroy();
    }

    await group.destroy();

    return true;
}

const deleteGroupMutation = {
    type: GraphQLBoolean,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: deleteGroupResolver,
};

export default deleteGroupMutation;