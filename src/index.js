import { render } from "inferno";
import { Provider } from "inferno-redux";
import { BrowserRouter, Route } from "inferno-router";

import App from "./App";
import "./index.css";
import store from "./store";

if (process.env.NODE_ENV === "development") require("inferno-devtools");

render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById("app")
);
