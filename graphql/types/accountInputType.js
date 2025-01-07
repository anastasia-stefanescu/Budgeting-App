import {GraphQLInputObjectType, GraphQLString, GraphQLInt} from 'graphql'

const accountInputType = new GraphQLInputObjectType({
    name: 'AccountInput',
    fields: {
        balance: { type: GraphQLInt},
    }
});

export default accountInputType;