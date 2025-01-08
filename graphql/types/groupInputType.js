import { GraphQLInputObjectType, GraphQLString } from 'graphql';

const groupInputType = new GraphQLInputObjectType({
    name: 'GroupInput',
    fields: {
        name: { type: GraphQLString },
        description: { type: GraphQLString }
    }
});

export default { groupInputType };