import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";

import getTIP from "./redux/reducers/getTIPInfo";
import connectTilesToMap from "./redux/reducers/connectTilesToMap";
import getComments from "./redux/reducers/commentsReducer";

const rootReducer = combineReducers({ getTIP, connectTilesToMap, getComments });

let store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
