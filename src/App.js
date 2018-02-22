import { Component } from "inferno";
import "./registerServiceWorker";
import { connect } from "inferno-redux";

/* app components */
import "./App.css";
import Navbar from "./components/navbar/Navbar.js";
import AppContainer from "./components/app-container/AppContainer.js";
import Homepage from "./components/homepage/Homepage.js";

const search = (instance, address) =>
  instance.setState({ searched: true, address: "tbd" });

class App extends Component {
  constructor(props) {
    super(props);
    console.log("props is ", this.props);
    this.state = {
      searched: this.props.searched,
      address: ""
    };
  }

  render() {
    // TODO: once it's set up, conditionally pass 'this.props.address' into AppContainer so that map and tilescontainer can have access to it
    // low key might not even need to do that. If address is in global state, I can just access it from those components. TBD on whichever will
    // cut down on API calls.
    return (
      <div>
        {this.props.searched ? (
          <div className="App">
            <Navbar />
            <AppContainer />
          </div>
        ) : (
          <Homepage />
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { searched: state.searched };
};

export default connect(mapStateToProps, null)(App);
