import axios from "axios"

axios.interceptors.request.use(function (config) {
    // 在此判断当前用户是否拥有请求此地址的权限，如果有那么放行，如果没有那么需要
    // 截断此请求
    // 然后判断当前用户是否拥有此请求权限
    console.log(config.url); // 你要请求的url地址
    return config
}, function (error) {
    // Do something with request error
    return Promise.reject(error)
})

export default {
    // 用户登录
    userLogin(data) {
        return axios.post('/api/userlogin', data);
    },
    // 加载用户列表倒序
    loadUserList(params) {
        params = { ...params, ...{ _sort: 'id', _order: 'desc' } }
        return axios.get('/per/user', { params: params });
    },
    // 添加用户
    addUser(data) {
        return axios.post('/per/user', data);
    },
    // 删除用户
    deleteUser(ids) {
        return Promise.all(ids.map(id => {
            return axios.delete(`/per/user/${id}`)
        }))
    },
    // 修改用户
    updateUser(user) {
        return axios.put(`/per/user/${user.id}`, user);
    },
    // 加载角色列表
    loadRoleList(params) {
        return axios.get('/per/role', { params })
    },
    // 删除角色
    deleteRoles(ids) {
        return Promise.all(ids.map(id => {
            return axios.delete(`/per/role/${id}`)
        }))
    },
    addRole(role) {
        return axios.post('/per/role', role)
    },
    // 修改角色
    saveRole(role) {
        return axios.put(`/per/role/${role.id}`, role);
    },
    loadPerList(params) {
        return axios.get('/per/permission', { params });
    },
    // 添加权限
    addPer(params) {
        return axios.post('/per/permission', params);
    },
    editPer(per) {
        return axios.put(`/per/permission/${per.id}`, per);
    },
    deletePer(ids) {
        return Promise.all(ids.map(id => {
            return axios.delete(`/per/permission/${id}`);
        }))
    },
    // 加载所有的角色信息
    loadAllRoles() {
        return axios.get('/per/role');
    },
    // 加载用户管理的角色信息
    loadUserRoles(userId) {
        return axios.get('/per/user_role', { params: { userId } })
    },
    // 给用户设置关联的角色信息
    addUserRole(userRole) {
        return axios.post('/per/user_role', userRole);
    },
    deleteUserRole(id) {
        return axios.delete(`/per/user_role/${id}`);
    },
    // 加载所有的权限数据
    loadAllPer() {
        return axios.get('/per/permission');
    },
    // 加载用户角色
    loadRolePer(roleId) {
        return axios.get('/per/role_permission', { params: { roleId } })
    },
    // 添加角色权限
    addRolePer(rolePer) {
        return axios.post('/per/role_permission', rolePer);
    },
    // 删除角色和权限的关联
    deleteRolePer(rolePerId) {
        return axios.delete(`/per/role_permission/${rolePerId}`)
    },
    // 加载用户的所有关联的用户权限
    loadUserPer(userId) {
        return axios.get('/per/user_permission', { params: { userId } })
    },
    addUserPer(userPer) {
        return axios.post('/per/user_permission', userPer)
    },
    deleteUserPer(id) {
        return axios.delete(`/per/user_permission/${id}`);
    },
    // 加载用户的所有权限
    loadUserAllPer(id) {
        return axios.get(`/per/getUserPer/${id}`);
    }
}