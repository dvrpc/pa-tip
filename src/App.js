import { Component } from "inferno";
import "./registerServiceWorker";
import { BrowserRouter, Route, Switch } from "inferno-router";

/* app components */
import "./App.css";
import AppContainer from "./components/app-container/AppContainer.js";
import Homepage from "./components/homepage/Homepage.js";
import Expanded from "./components/expanded/Expanded.js";

class App extends Component {
  render() {
    // TODO: create a catch page for broken links that says something like 'oops, page doesn't exist' and then redirects to the homepage
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route path="/main" component={AppContainer} />
          <Route path="/expanded/:county/:id" component={Expanded} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
