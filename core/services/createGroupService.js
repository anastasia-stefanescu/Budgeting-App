import db from '../../models/index.js';

export const createGroup = async (group, context) => { 
    const newGroup = await db.Group.create({
        name: group.name,
        description: group.description
    });

    newGroup.addUser(context.user_id);

    const createdGroup = await db.Group.findOne({
        where: {
            id: newGroup.id,
        }
    });

    return createdGroup;
};