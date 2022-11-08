import ActionTypes from "./ActionTypes"

import service from '../Service'

export function LoadUserAction(payload) {
    return {
        type: ActionTypes.LOAD_USER_LIST,
        payload
    }
}

export function LoadUserActionAsync(params) {
    return dispatch => {
        return service.loadUserList(params).then(
            res => {
                let total = parseInt(res.headers['x-total-count'])
                dispatch(LoadUserAction({ list: res.data, total: total }))
            }
        )
    }
}

// 添加用户
export function AddUserAction(payload) {
    return {
        type: ActionTypes.ADD_USER,
        payload
    }
}

export function AddUserActionAsync(payload) {
    return dispatch => {
        return service.addUser(payload).then(res => {
            dispatch(AddUserAction(res.data))
        })
    }
}

// 更新编辑用户
export function EditUserAction(payload) {
    return {
        type: ActionTypes.EDIT_USER,
        payload
    }
}


export function EditUserActionAsync(payload) {
    return dispatch => {
        return service.updateUser(payload).then(
            res => {
                dispatch(EditUserAction(payload))
            }
        )
    }

}