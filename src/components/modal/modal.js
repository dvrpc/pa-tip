import Inferno, { Component } from "inferno";
import swal from "sweetalert2";
import { connect } from "inferno-redux";

import { getFullTIP } from "../reducers/getTIPInfo";

// TODO: update URL when a modal pops up

const getComment = () => console.log("input area submitted a comment");

class Modal extends Component {
  // TODO: POST a user submitted comment to the database (must also create the reducer/dispatcher for this)
  // TODO: GET user submitted comments for any particular project and display them in the modal window
  // TODO: pass ID from the tile into this Modal in order to make the full-information API call
  constructor(props) {
    super(props);
    // TODO: update the URL to correspond to the ID of the jawn
  }

  componentWillMount() {
    console.log("MODAL PROPS BOIIIII ", this.props);
    this.props.getFullTIP(this.props.id);
  }
  componentDidMount() {
    const table =
      "<table><thead><th>Phase</th><th>Fund</th><th>Year</th></thead><tbody><tr><td>CON</td><td>TOLL</td><td>2017</td></tr><tr><td>DRF</td><td>TAU</td><td>2021</td></tr><tr><td>EKL</td><td>NOP</td><td>2029</td></tr></tbody></table>";
    const footer = `<h2>Add a comment </h2><textarea></textarea><input type="submit" value="submit" onSubmit={linkEvent(this, getComment)} >`;
    swal({
      title: this.props.title,
      width: "50%",
      padding: 80,
      html:
        "a whole bunch of placeholder text for now until I get the API call with the fully fleshed out desciprionts all up in this join na mean" +
        table,
      showConfirmButton: false,
      footer: footer
    });
  }
  render() {
    return <div id="modal" />;
  }
}

// TODO: connect to the redux store to dispatch the ID API
const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id))
  };
};
export default connect(null, mapDispatchToProps)(Modal);
