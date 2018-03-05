import Inferno, { Component, linkEvent } from "inferno";

import Navbar from "../navbar/Navbar.js";
// GOAL: a printable, shareable view of the modal which includes all the information in the modal + the data tables
// To populate: Pass the entire response object as props from modal to Expanded.js and go from there
// include the dispatcher to the comments database for people that want to submit comments.
// needs to connect to redux ONLY to dispatch the comment (information will be passed directly from parent component...should it come from redux store?)

// LAYOUT:
// navbar
// two column:
// column-left: title and description
// column-right: two rows
// top row: tab component displaying either the funds data table or the milestone data table
// bottom row: make and/or view comments

class Expanded extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="expanded">
        <Navbar />
        <h1>suuuup its the expanded jawn</h1>
      </div>
    );
  }
}

export default Expanded;
