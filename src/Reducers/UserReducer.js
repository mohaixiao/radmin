import ActionTypes from "../Action/ActionTypes";

export default function UserReducer(preState = { list: [], total: 0 }, action) {
    switch (action.type) {
        case ActionTypes.LOAD_USER_LIST:
            return action.payload
        case ActionTypes.ADD_USER:
            preState.list.shift(action.payload);
            preState.total++;
            return { ...preState };
            case ActionTypes.EDIT_USER:
                let preIndex = preState.list.findIndex((item) => item.id !== action.payload.id);
                preState.list.splice(preIndex,1,action.payload);
                return {...preState}
        default:
            return preState
    }
}
