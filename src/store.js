import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReudcers from './Reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

const store = createStore(rootReudcers, {}, composeWithDevTools(applyMiddleware(thunk)));

export default store;
