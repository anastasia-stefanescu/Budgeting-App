import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import accountType from "./accountType.js";

const groupType = new GraphQLObjectType({
    name: 'Group',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        members: {
            type: new GraphQLList(accountType),
            resolve: async (group) => {
                return await group.getMembers();
            }
        }
    }
});

export default groupType;