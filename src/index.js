import { render } from "inferno";
import { Provider } from "inferno-redux";

import App from "./App";
import "./index.css";
import store from "./store";

if (process.env.NODE_ENV === "development") require("inferno-devtools");

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
