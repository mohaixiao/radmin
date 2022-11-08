import { combineReducers } from "redux";
import UserReducer from './UserReducer'
import PerReducer from './PerReducer'

const rootReducer = combineReducers({
    Userlist: UserReducer,
    Perlist: PerReducer
});
export default rootReducer