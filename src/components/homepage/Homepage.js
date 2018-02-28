import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import "./Homepage.css";
import { getTIP } from "../reducers/getTIPInfo";

const changePage = (instance, e) => {
  e.preventDefault();
  const address = e.target.querySelector("input").value;
  let validAddress = true;

  // TODO: validate the search input BEFORE pushing to history
  if (validAddress) {
    // hit the dispatch
    instance.props.getTIP(address);
    instance.props.history.push(`/main/${address}`);
  } else {
    // do something to prompt re-entry from a user
  }
};

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homepage">
        <h1>FY19 PA TRANSPORTATION IMPROVEMENT PROGRAM</h1>
        <form id="search-form" onSubmit={linkEvent(this, changePage)}>
          <input
            type="text"
            placeholder="Search by municipality, city, zip code or neighborhood"
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTIP: address => {
      dispatch(getTIP(address));
    }
  };
};

// TODO: get redux back with THIS: export default withRouter(connect(...)(Homepage))
export default withRouter(connect(null, mapDispatchToProps)(Homepage));
