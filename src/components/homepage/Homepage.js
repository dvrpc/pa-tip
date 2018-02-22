import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./Homepage.css";
import { updateSearchBool } from "../reducers/getTIPInfo";

const sendAddress = (instance, e) => {
  e.preventDefault();
  // TODO: SANITIZE THIS BUSINESS (autocomplete later)
  const address = e.target.querySelector("input").value;

  updateSearchBool("slekfjlekfj");
};

class Homepage extends Component {
  constructor() {
    super();
  }

  componentDidUpdate() {
    console.log("entered update");
  }

  render() {
    return (
      <div className="homepage">
        <div className="banner">
          <h1>A cool logo will be made for this</h1>
        </div>
        <form id="search-form" onSubmit={linkEvent(this, sendAddress)}>
          <h1>Search TIP Projects by Location</h1>
          <input
            type="text"
            placeholder="Enter a municipality, city, zip code or Philadelphia neighborhood"
          />
        </form>
      </div>
    );
  }
}

// update the redux store by:
// passing the searched bool to render AppContainer
// passing the address to use for API calls
/*const mapDispatchToProps = dispatch => {
  return{
    getTIP: address => dispatch(getTIPInfo(address))
  }
}*/
// pass the boooooooool to the Redux store in order to update app.js and trigger a rendering of appContainer.js
const mapDispatchToProps = dispatch => {
  return {
    updateSearchBool: search => dispatch(updateSearchBool(search))
  };
};
export default connect(null, mapDispatchToProps)(Homepage);
