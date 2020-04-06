import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";

import getTIP from "./components/reducers/getTIPInfo";
import connectTilesToMap from "./components/reducers/connectTilesToMap";
import getComments from "./components/reducers/commentsReducer";

const rootReducer = combineReducers({ getTIP, connectTilesToMap, getComments });

let store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
