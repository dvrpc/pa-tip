import Inferno, { Component, linkEvent } from "inferno";
import swal from "sweetalert2";
import { connect } from "inferno-redux";

// TODO: update URL when a modal pops up

const getComment = () => console.log("input area submitted a comment");

class Modal extends Component {
  // TODO: POST a user submitted comment to the database (must also create the reducer/dispatcher for this)
  // TODO: GET user submitted comments for any particular project and display them in the modal window
  constructor(props) {
    super(props);
    // TODO: update the URL to correspond to the ID of the jawn
  }

  componentDidUpdate() {
    console.log("modal props on did update ", this.props);
    const details = this.props.details;
    const table =
      "<table><thead><th>Phase</th><th>Fund</th><th>Year</th></thead><tbody><tr><td>CON</td><td>TOLL</td><td>2017</td></tr><tr><td>DRF</td><td>TAU</td><td>2021</td></tr><tr><td>EKL</td><td>NOP</td><td>2029</td></tr></tbody></table>";
    const footer = `<h2>Add a comment </h2><textarea></textarea><input type="submit" value="submit" onSubmit=${linkEvent(
      this,
      getComment
    )} >`;

    swal({
      title: details.road_name,
      width: "50%",
      padding: 80,
      html: `${details.description} ${table}`,
      showConfirmButton: false,
      footer: footer
    });
  }

  componentDidMount() {}

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
