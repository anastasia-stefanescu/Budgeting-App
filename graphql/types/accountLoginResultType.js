import {GraphQLObjectType, GraphQLString} from 'graphql'

const accountLoginResultType = new GraphQLObjectType({
    name: 'AccountLoginResult',
    fields: {
        token: { type: GraphQLString },
    }
});

export default accountLoginResultType;