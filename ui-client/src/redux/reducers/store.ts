import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducers from "./userReducers";
import dataReducers from "./dataReducers";

const initialState = {};
const middleware = [thunk];

const reducers = combineReducers({
    user: userReducers,
    data: dataReducers,
});

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
