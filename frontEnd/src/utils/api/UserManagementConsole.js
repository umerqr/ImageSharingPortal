import axios from 'axios'

const BASE_URL = process.env.REACT_APP_BASE_URL

const getAllAccounts = async token => await axios({
    method: `get`,
    url: `${BASE_URL}/api/accounts/`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getAccount = async (accountId, uid, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/accounts`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const createAccount = async (accountObj, accountId, token) => await axios({
    method: `post`,
    url: `${BASE_URL}/api/${accountId}/accounts`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: accountObj,
})

const updateAccount = async (updatedAccountObj, accountId, token) => await axios({
    method: `patch`,
    url: `${BASE_URL}/api/${accountId}/accounts`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: updatedAccountObj,
})

const deleteAccount = async (deleteObj, accountId, token) => await axios({
    method: `delete`,
    url: `${BASE_URL}/api/${accountId}/accounts`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: deleteObj,
})

const getAllUsers = async token => await axios({
    method: `get`,
    url: `${BASE_URL}/api/users/`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getAccountUsers = async (accountId, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/users`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getUser = async (accountId, uid, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/users/${uid}`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const createUser = async (userObj, accountId, token) => await axios({
    method: `post`,
    url: `${BASE_URL}/api/${accountId}/users`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: userObj,
})

const updateUser = async (updatedUserObj, accountId, token) => await axios({
    method: `patch`,
    url: `${BASE_URL}/api/${accountId}/users`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: updatedUserObj,
})

const deleteUser = async (deleteObj, accountId, token) => await axios({
    method: `delete`,
    url: `${BASE_URL}/api/${accountId}/users`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: deleteObj,
})

const getAllPermissions = async token => await axios({
    method: `get`,
    url: `${BASE_URL}/api/permissions/`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getAllAccountPermissions = async (accountId, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/permissions`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getUserPermissions = async (accountId, uid, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/permissions/${uid}`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const createNewPermission = async (permissionObj, accountId, token) => await axios({
    method: `post`,
    url: `${BASE_URL}/api/${accountId}/permissions`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: permissionObj,
})

const updatePermission = async (updatedPermissionObj, accountId, token) => await axios({
    method: `patch`,
    url: `${BASE_URL}/api/${accountId}/permissions`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: updatedPermissionObj,
})

const deletePermission = async (deleteObj, accountId, token) => await axios({
    method: `delete`,
    url: `${BASE_URL}/api/${accountId}/permissions`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: deleteObj,
})

const getAllRoles = async token => await axios({
    method: `get`,
    url: `${BASE_URL}/api/roles/`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getAllAccountRoles = async (accountId, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/roles`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getUserRoles = async (accountId, uid, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/roles/${uid}`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const createRole = async (roleObj, accountId, token) => await axios({
    method: `post`,
    url: `${BASE_URL}/api/${accountId}/roles`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: roleObj,
})

const updateRole = async (updatedRoleObj, accountId, token) => await axios({
    method: `patch`,
    url: `${BASE_URL}/api/${accountId}/roles`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: updatedRoleObj,
})

const deleteRole = async (deleteObj, accountId, token) => await axios({
    method: `delete`,
    url: `${BASE_URL}/api/${accountId}/roles`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: deleteObj,
})

const getAllRoleGroups = async token => await axios({
    method: `get`,
    url: `${BASE_URL}/api/role-groups/`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getAllAccountRoleGroups = async (accountId, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/role-groups`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const getAccountRoleGroups = async (accountId, id, token) => await axios({
    method: `get`,
    url: `${BASE_URL}/api/${accountId}/role-groups/${id}`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
})

const createRoleGroup = async (roleGroupObj, accountId, token) => await axios({
    method: `post`,
    url: `${BASE_URL}/api/${accountId}/role-groups`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: roleGroupObj,
})

const updateRoleGroup = async (updatedRoleGroupObj, accountId, token) => await axios({
    method: `patch`,
    url: `${BASE_URL}/api/${accountId}/role-groups`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: updatedRoleGroupObj,
})

const deleteRoleGroup = async (deleteObj, accountId, token) => await axios({
    method: `delete`,
    url: `${BASE_URL}/api/${accountId}/role-groups`,
    headers: {
        'Content-Type': `application/json`,
        token,
    },
    data: deleteObj,
})

export default {
    getAllUsers,
    getUser,
    getAccountUsers,
    createUser,
    updateUser,
    deleteUser,
    updateAccount,
    deleteAccount,
    createAccount,
    getAccount,
    getAllAccounts,
    getAllRoles,
    getAllRoleGroups,
    getAllPermissions,
    getAllAccountPermissions,
    getAllAccountRoleGroups,
    getAllAccountRoles,
    getUserPermissions,
    getAccountRoleGroups,
    getUserRoles,
    createNewPermission,
    createRoleGroup,
    createRole,
    updatePermission,
    updateRoleGroup,
    updateRole,
    deletePermission,
    deleteRoleGroup,
    deleteRole,
}
