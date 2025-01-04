import { GraphQLList, GraphQLInt } from 'graphql';
import userType from '../types/userType.js'; // Replace with the correct path to your user type definition
import db from '../../models/index.js';

const usersQueryResolver = async () => {
    const users = await db.User.findAll();

    return users;
}

const userQueryResolver = async (_, { id }) => {
    const user = await db.User.findOne({
        where: {
            id,
        }
    });

    if (!user) {
        return null;
    }

    return user;
}

export const usersQuery = {
    type: new GraphQLList(userType),
    resolve: usersQueryResolver,
};

export const userQuery = {
    type: userType,
    args: {
        id: { type: GraphQLInt },
    },
    resolve: userQueryResolver,
};
