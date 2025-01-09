import { GraphQLInt, GraphQLObjectType, GraphQLString, GraphQLList } from "graphql";
import userType from "./userType.js";

const groupType = new GraphQLObjectType({
    name: 'Group',
    fields: {
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        members: {
            type: new GraphQLList(userType),
            resolve: async (group) => {
                return await group.getUsers();
            }
        }
    }
});

export default groupType;