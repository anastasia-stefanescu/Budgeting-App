import {GraphQLInputObjectType, GraphQLString, GraphQLInt} from 'graphql'

const accountInputType = new GraphQLInputObjectType({
    name: 'AccountInput',
    fields: {
        Balance: { type: GraphQLInt},
    }
});

export default accountInputType;