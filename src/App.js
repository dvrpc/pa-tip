import React, { Component } from "react";
import "./registerServiceWorker";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

/* app components */
import "./App.css";
import AppContainer from "./components/app-container/AppContainer.js";
import Homepage from "./components/homepage/Homepage.js";

class App extends Component {
  render() {
    return (
      <Router basename={`${process.env.PUBLIC_URL}`}>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route
            path="/:type(location|keyword|project)/:value"
            component={AppContainer}
          />
        </Switch>
      </Router>
    );
  }
}

export default App;
