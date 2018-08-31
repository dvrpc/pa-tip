import { Component } from "inferno";
import "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "inferno-router";

/* app components */
import "./App.css";
import AppContainer from "./components/app-container/AppContainer.js";
import Homepage from "./components/homepage/Homepage.js";
import Expanded from "./components/expanded/Expanded.js";

class App extends Component {
  render() {
    return (
      <Router basename={`${process.env.PUBLIC_URL}`}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route
            path="/:type(location|keyword)/:value"
            component={AppContainer}
          />
          <Route path="/expanded/:id" component={Expanded} />
        </Switch>
      </Router>
    );
  }
}

export default App;
