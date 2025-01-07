import {GraphQLInputObjectType, GraphQLObjectType, GraphQLString} from 'graphql'

const accountLoginInputType = new GraphQLInputObjectType({
    name: 'AccountLoginInput',
    fields: {
        CardNo: { type: GraphQLString },
        password: { type: GraphQLString }
    }
});

export default userInputType;