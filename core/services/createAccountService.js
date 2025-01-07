import crypto from 'crypto';
import db from '../../models/index.js';


function generateRandomNumberString(length) {
    const randomBytes = crypto.randomBytes(length);
    let randomString = '';

    for (const byte of randomBytes) {
        randomString += (byte % 10).toString();
        if (randomString.length === length) break;
    }

    return randomString;
}

export const createAccount = async (account, context) => {
    const iban = crypto.randomBytes(24).toString('hex').slice(0, 24);
    const cardno = generateRandomNumberString(16);
    
    const createdAccount = await db.Account.create({
        IBAN: iban,
        cardNo: cardno,
        balance: account.balance,
        userId: context.user_id,
    });

    return createdAccount;

}
