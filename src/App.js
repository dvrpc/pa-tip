import { Component } from "inferno";
import "./registerServiceWorker";
import { BrowserRouter, Route, Switch } from "inferno-router";

/* app components */
import "./App.css";
import AppContainer from "./components/app-container/AppContainer.js";
import Homepage from "./components/homepage/Homepage.js";

class App extends Component {
  render() {
    // TODO: add a variable to the results path to make it unique to the search query
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/main" component={AppContainer} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
