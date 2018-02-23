import { createStore, applyMiddleware } from "redux";
import ReduxThunk from "redux-thunk";
import getTIP from "./components/reducers/getTIPInfo";

const store = createStore(getTIP, applyMiddleware(ReduxThunk));

export default store;
