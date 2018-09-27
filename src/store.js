import { createStore, applyMiddleware, combineReducers } from "redux";
import ReduxThunk from "redux-thunk";

import getTIP from "./components/reducers/getTIPInfo";
import connectTilesToMap from "./components/reducers/connectTilesToMap";
import StateLoader from "./utils/persist.js";

const stateLoader = new StateLoader();

const rootReducer = combineReducers({ getTIP, connectTilesToMap });

let store = createStore(
  rootReducer,
  stateLoader.loadState(),
  applyMiddleware(ReduxThunk)
);

store.subscribe(() => stateLoader.saveState(store.getState()));

export default store;
