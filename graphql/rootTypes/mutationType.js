import graphql from 'graphql';
import createUserMutation from '../mutations/user/createUserMutation.js';
import updateUserMutation from '../mutations/user/updateUserMutation.js';
import deleteUserMutation from '../mutations/user/deleteUserMutation.js';
import loginMutation from '../mutations/user/loginMutation.js';
import createBudgetMutation from '../mutations/budget/createBudgetMutation.js';
import updateBudgetMutation from '../mutations/budget/updateBudgetMutation.js';
import deleteBudgetMutation from '../mutations/budget/deleteBudgetMutation.js';
import updateAccountMutation from '../mutations/account/updateAccountMutation.js';
import createAccountMutation from '../mutations/account/createAccountMutation.js';
import deleteAccountMutation from '../mutations/account/deleteAccountMutation.js';
import createTransactionMutation from '../mutations/transaction/createTransactionMutation.js';
import createGroupMutation from '../mutations/group/createGroupMutation.js';
import updateGroupMutation from '../mutations/group/updateGroupMutation.js';
import deleteGroupMutation from '../mutations/group/deleteGroupMutation.js';
import addMemberMutation from '../mutations/group/addMemberMutation.js';
import removeMemberMutation from '../mutations/group/removeMemberMutation.js';
import createGroupBudgetMutation from '../mutations/groupBudget/createGroupBudgetMutation.js';
import updateGroupBudgetMutation from '../mutations/groupBudget/updateGroupBudgetMutation.js';
import deleteGroupBudgetMutation from '../mutations/groupBudget/deleteGroupBudgetMutation.js';
import createGroupTransferMutation from '../mutations/groupTransfer/createGroupTransferMutation.js';

const queryType = new graphql.GraphQLObjectType({
    name: "Mutation",
    fields: {
        createUser: createUserMutation,
        updateUser: updateUserMutation,
        deleteUser: deleteUserMutation,
        login: loginMutation,
        createAccount: createAccountMutation,
        updateAccount: updateAccountMutation,
        deleteAccount: deleteAccountMutation,
        createBudget: createBudgetMutation,
        updateBudget: updateBudgetMutation,
        deleteBudget: deleteBudgetMutation,
        createTransaction: createTransactionMutation,
        createGroup: createGroupMutation,
        updateGroup: updateGroupMutation,
        deleteGroup: deleteGroupMutation,
        addMember: addMemberMutation,
        removeMember: removeMemberMutation,
        createGroupBudget: createGroupBudgetMutation,
        updateGroupBudget: updateGroupBudgetMutation,
        deleteGroupBudget: deleteGroupBudgetMutation,
        createGroupTransfer: createGroupTransferMutation
    }
});


export default queryType;