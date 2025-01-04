import userInputType from '../../types/userInputType.js';
import db from '../../../models/index.js';
import userType from '../../types/userType.js';
import bcrypt from 'bcrypt';

const createUserMutationResolver = async (_, { user }, context) => {
    const password = await bcrypt.hash(user.password, 5);

    console.log('Creating user: ', user.name, password);

    const createdUser = await db.User.create({
        name: user.name,
        password: password,
    });

    return createdUser;
    
}

const createUserMutation = {
    type: userType,
    args: {
        user: {type: userInputType},
    },
    resolve: createUserMutationResolver,
};

export default createUserMutation;