import {GraphQLInputObjectType, GraphQLString, GraphQLInt} from 'graphql'

const transactionInputType = new GraphQLInputObjectType({
    name: 'TransactionInput',
    fields: {
        description: { type: GraphQLString },
        date: { type: GraphQLString },
        amount: { type: GraphQLInt},
        recipient: {type: GraphQLString}
    }
});

export default transactionInputType;