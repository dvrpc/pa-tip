import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import store from "./store";

if (process.env.NODE_ENV === "development") require("react-devtools");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
