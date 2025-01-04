import {GraphQLInputObjectType, GraphQLString, GraphQLInt} from 'graphql'

const transactionInputType = new GraphQLInputObjectType({
    name: 'TransactionInput',
    fields: {
        Description: { type: GraphQLString },
        Date: { type: GraphQLString },
        Amount: { type: GraphQLInt},
        Recipient: {type: GraphQLString}
    }
});

export default transactionInputType;