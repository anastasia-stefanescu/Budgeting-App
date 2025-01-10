import { GraphQLInputObjectType, GraphQLInt } from "graphql";

const groupTransferInputType = new GraphQLInputObjectType({
    name: 'GroupTransferInput',
    fields: {
        amount: { type: GraphQLInt }
    }
});

export default groupTransferInputType;