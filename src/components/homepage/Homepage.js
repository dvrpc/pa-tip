import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import "./Homepage.css";
import { updateSearchBool } from "../reducers/getTIPInfo";

const changePage = instance => {
  console.log("instance in change page ", changePage);
  {
    instance.props.history.push("/main");
  }
};

class Homepage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="homepage">
        <div className="banner">
          <h1>A cool logo will be made for this</h1>
        </div>
        <form id="search-form" onSubmit={linkEvent(this, changePage)}>
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

// TODO: hook this up to send the search information to the store so the jawns can API
/*const mapDispatchToProps = dispatch => {
};
*/

// TODO: get redux back with THIS: export default withRouter(connect(...)(Homepage))
export default withRouter(Homepage);
