import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";
import getTIP from "./components/reducers/getTIPInfo";
import getComments from "./components/reducers/commentsReducer";

const rootReducer = combineReducers({ getTIP, getComments });

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
