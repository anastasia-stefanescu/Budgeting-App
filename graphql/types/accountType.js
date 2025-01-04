import {GraphQLObjectType, GraphQLInt, GraphQLString} from 'graphql'
import userType from './userType.js';

const accountType = new GraphQLObjectType({
    name: 'Account',
    fields: {
        IBAN: { type: GraphQLString },
        CardNo: { type: GraphQLString },
        Balance: { type: GraphQLInt},
        createdAt: { type: GraphQLString },
        updatedAt: { type: GraphQLString },
        author: { 
            type: userType,
            resolve: async (acc) => {
                const user = await acc.getUser();

                return user;
            }
        },
    }
});

export default accountType;