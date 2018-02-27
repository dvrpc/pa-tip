import Inferno, { Component, linkEvent } from "inferno";
import swal from "sweetalert2";
import { connect } from "inferno-redux";

// TODO: update URL when a modal pops up

const getComment = () => console.log("input area submitted a comment");
const expandModal = () => console.log("expand modal button clicked");

class Modal extends Component {
  // TODO: POST a user submitted comment to the database (must also create the reducer/dispatcher for this)
  // TODO: GET user submitted comments for any particular project and display them in the modal window
  constructor(props) {
    super(props);
    // TODO: update the URL to correspond to the ID of the jawn
  }

  componentDidUpdate() {
    const details = this.props.details;
    // within details there's a large data table for FUNDS and a large data table for Milestones
    // both are too large to be in the modal, so maybe put them in the 'expand'option
    // limit the modal to description + add a comment.
    const table =
      "<table><thead><th>Phase</th><th>Fund</th><th>Year</th></thead><tbody><tr><td>CON</td><td>TOLL</td><td>2017</td></tr><tr><td>DRF</td><td>TAU</td><td>2021</td></tr><tr><td>EKL</td><td>NOP</td><td>2029</td></tr></tbody></table>";
    const footer = `<textarea></textarea><input type="submit" value="submit" onSubmit=${linkEvent(
      this,
      getComment
    )} >`;
    const expandButton = `<input id="expandButton" type="submit" value="click to expand" onClick=${linkEvent(
      this,
      expandModal
    )} />`;
    swal({
      title: details.road_name,
      width: "50%",
      padding: 80,
      html: `<p>${details.description}</p>  ${expandButton}`,
      showConfirmButton: false,
      footer: footer
    });
  }

  render() {
    return <div id="modal" />;
  }
}

// TODO: connect to the redux store to dispatch the ID API
const mapStateToProps = state => {
  return {
    details: state.details
  };
};

export default connect(mapStateToProps, null)(Modal);
