import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./Homepage.css";

const sendAddress = (instance, e) => {
  e.preventDefault();
  // TODO: SANITIZE THIS BUSINESS (autocomplete later)
  const address = e.target.querySelector("input").value;
  instance.setState({ address });
};

class Homepage extends Component {
  constructor() {
    super();
    this.state = {
      address: "",
      searched: false
    };
  }

  // pass state and bool to the redux store to render the main APP and make the
  // correct API call
  componentDidUpdate() {
    console.log("state is ", this.state);
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

// pass the address to the Redux store in order to make the API call
/*const mapDispatchToProps = dispatch => {
  return{
    getTIP: address => dispatch(getTIPInfo(address))
  }
}*/
// pass the boooooooool to the Redux store in order to update app.js and trigger a rendering of appContainer.js
/*const mapStateToProps = () => {searched: true}
*/
/*export default connect(mapStateToProps, null)(Homepage);*/
export default Homepage;
