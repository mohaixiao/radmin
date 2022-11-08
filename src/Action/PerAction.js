import ActionTypes from "./ActionTypes"

import service from '../Service'

export function LoadPerAction(payload) {
    return {
        type: ActionTypes.LOAD_PER_LIST,
        payload
    }
}

export function LoadPerActionAsync(params) {
    return dispatch => {
        return service.loadPerList(params).then(
            res => {
                let payload = { list: res.data, total: parseInt(res.headers['x-total-count']) };
                dispatch(LoadPerAction(payload))
            }
        )
    }
}

// 添加用户
export function AddPerAction(payload) {
    return {
        type: ActionTypes.ADD_PER,
        payload
    }
}

export function AddPerActionAsync(params) {
    return dispatch => {
        return service.addPer(params).then(res => {
            dispatch(AddPerAction(res.data))
        })
    }
}
export function EditPerAction(payload) {
    return {
        type: ActionTypes.EDIT_PER,
        payload
    }
}

export function EditPerActionAsync(per) {
    return dispatch => {
        service.editPer(per).then(
            res => {
                dispatch(EditPerAction(per))
            }
        )
    }
}

export function DeletePerAction(payload) {
    return {
        type: ActionTypes.DELETE_PER,
        payload
    }
}


export function DeletePerActionAsync(ids) {
    return dispatch => {
        return service.deletePer(ids).then(
            res => {
                dispatch(DeletePerAction(ids))
            }
        )
    }
}