import graphql from 'graphql';
import userInputType from '../../types/userInputType.js';
import userType from '../../types/userType.js';
import db from '../../../models/index.js';
import bcrypt from 'bcrypt';


const updateUserMutationResolver = async (_, args, context) => {
    const isAuthorized = !!context.user_id
   
    if(!isAuthorized) {
        return false;
    }

    const id = args.id;

    const user = await db.User.findOne({
        where: {
            id,
        }
    });

    if(!user) {
        return false;
    }

    const crypted_password = await bcrypt.hash(args.user.password, 5);

    const updatedUser = await user.update({
        name: args.user.name,
        password: crypted_password,
    });

    return updatedUser;
}

const updateUserMutation = {
    type: userType,
    args: {
        id: {type: graphql.GraphQLInt},
        user: {type: userInputType},
    },
    resolve: updateUserMutationResolver,
};

export default updateUserMutation;