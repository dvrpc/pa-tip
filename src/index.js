import { render } from "inferno";
import { Provider } from "inferno-redux";

import App from "./App";
import "./index.css";
import store from "./store";

if (process.env.NODE_ENV === "development") require("inferno-devtools");

// TODO: look into why wrapping <App /> in a Provider breaks EVERYTHING. AAAGH.
render(<App />, document.getElementById("app"));
