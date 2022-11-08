import ActionTypes from "../Action/ActionTypes";

export default function PerReducer(preState = { list: [], total: 0 }, action) {
    let newState = { ...preState };
    switch (action.type) {
        case ActionTypes.DELETE_PER:
            newState.list = newState.list.filter(item => !action.payload.includes(item.id))
            newState.total = newState.total - action.payload.length;
            return newState;
        case ActionTypes.ADD_PER:
            newState.list.push(action.payload);
            newState.total += 1;
            return newState;
        case ActionTypes.EDIT_PER:
            let editPerIndex = newState.list.findIndex(item => item.id === action.payload)
            newState.list.splice(editPerIndex, 1, action.payload);
            return newState;
        case ActionTypes.LOAD_PER_LIST:
            return action.payload
        default:
            return preState
    }
}
