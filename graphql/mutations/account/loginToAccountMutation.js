import { JWT_SECRET } from '../../../constants.js';
import accountLoginInputType from '../../types/accountLoginInputType.js';
import accountLoginResultType from '../../types/accountLoginResultType.js';
import jwt from 'jsonwebtoken';
import db from '../../../models/index.js';
import bcrypt from 'bcrypt';

const loginToAccountMutationResolver = async (_, {credentials}, context) => {
    // AICI TREBUIE SI verificarea userului??

    //cautam dupa card
    const account = await db.Account.findOne({
        where: {
            cardNo: credentials.cardNo,
        }
    });

    if(!account) {
        return {
            token: null,
        }
    }

    const providedPassword = credentials.password;
    const accountPassword = account.password;

    //console.log('Parola de login:', providedPassword, 'parola din db:', userPassword);

    const passwordIsValid = await bcrypt.compare(providedPassword, accountPassword);

    if(!passwordIsValid) {
        console.log("Password is invalid");

        return {
            token: null,
        }
    }
    
    const token = jwt.sign({ account_id: account.id }, JWT_SECRET);
    console.log("Inside login mutation, signed token:", token);
    //console.log("Used JWT:", JWT_SECRET);
    
    return {
        token,
    };
}

const loginToAccountMutation = {
    type: accountLoginResultType,
    args: {
        credentials: {type: accountLoginInputType},
    },
    resolve: loginToAccountMutationResolver,
};

export default loginToAccountMutation;