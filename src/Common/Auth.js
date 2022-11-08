import Service from "../Service";

// 当前登录用户的sessionStorage的key
const APP_LOGIN_USER = 'APP_LOGIN_USER';

/**
 * 效验当前用户是否已经登录
 * @return {Boolean} 如果已经登录：true, 否则false
 */

export function AuthLogin() {
    let loginUserStr = sessionStorage.getItem(APP_LOGIN_USER);
    if (loginUserStr) {
        return true;
    }
    return false;
}

/**
 * 储存当前用户登录的信息到本地储存
 * @param {Object} user
 * @return undefined
 */

export function SaveLoginUserInfo(user) {
    sessionStorage.setItem(APP_LOGIN_USER, JSON.stringify(user));
}

/**
 * 储存当前用户登录的信息到本地储存
 * @return Object
 */

export function GetLoginUserInfo() {
    let userStr = sessionStorage.getItem(APP_LOGIN_USER);
    if (userStr) {
        return JSON.parse(userStr);
    }
    return null;
}

/**
 * 储存当前用户登录的信息到本地储存
 * @param {Object} user
 * 
 */

export function Logout() {
    sessionStorage.clear();
}

/**
 * 储存当前用户登录后的token信息到本地储存
 * @param {String} token
 * 
 */

export function SaveLogoinToken(token) {
    sessionStorage.setItem('Authorization', token);
}


/**
 * 获取当前用户登录后的token信息到本地储存
 * @param {String} token
 * 
 */

export function GetLogoinToken() {
    return sessionStorage.getItem('Authorization');
}


/**
 * 获取当前用户登录后的所有权限
 * @param {Promise} 对象内部返回当前登录用户的所有权限
 * 
 */

export function getLoginUserAllPer() {
    // 拿到当前登录用户的id
    let userId = GetLoginUserInfo().id;
    // 先从换成中获取当前登录用户的所有权限，如果有就直接返回
    let loginUserPerStr = sessionStorage.getItem('LOGIN_USER_PER');
    if (loginUserPerStr) {
        return Promise.resolve(JSON.parse(loginUserPerStr));
    }
    // 没有就发送请求
    return Service.loadUserAllPer(userId)
        .then(res => {
            // 存档
            sessionStorage.setItem('LOGIN_USER_PER', JSON.stringify(res.data))
            return res.data
        })
}
