import Inferno, { Component, linkEvent } from "inferno";
import swal from "sweetalert2";
import { connect } from "inferno-redux";
import { Link } from "inferno-router";

// TODO: update URL when a modal pops up

const getComment = () => console.log("input area submitted a comment");
const expandModal = () => console.log("expand modal button clicked");

// style object for inferno-router Link components
const linkStyles = {
  color: "#17618b",
  marginLeft: "5%",
  textDecoration: "none"
};

class Modal extends Component {
  // TODO: POST a user submitted comment to the database (must also create the reducer/dispatcher for this)
  // TODO: GET user submitted comments for any particular project and display them in the modal window
  constructor(props) {
    super(props);
    // TODO: update the URL to correspond to the ID of the jawn
  }

  componentDidUpdate() {
    const details = this.props.details;
    // TODO: put create a new page that has fund + achievements + all of the other relevant info on it. Make it exportable/printable/whatever
    const table =
      "<table><thead><th>Phase</th><th>Fund</th><th>Year</th></thead><tbody><tr><td>CON</td><td>TOLL</td><td>2017</td></tr><tr><td>DRF</td><td>TAU</td><td>2021</td></tr><tr><td>EKL</td><td>NOP</td><td>2029</td></tr></tbody></table>";
    const footer = `<textarea placeholder="Submit a comment for this project"></textarea><input id="submitCommentButton" type="submit" value="submit" onSubmit=${linkEvent(
      this,
      getComment
    )} >`;
    let linkToProject;
    details.video
      ? (linkToProject = `<a href="${
          details.video
        }" id="linkToProject" target="_blank" rel="external">go to project</a> &nbsp; | &nbsp; `)
      : (linkToProject = "");
    const linkToMoreInfo = `<Link to="/details/${details.road_name}/${
      details.id
    }" id="linkToMoreInfo" style={linkStyles}>expand for more info</Link>`;
    swal({
      title: details.road_name,
      width: "50%",
      padding: 40,
      background: "#eee",
      html: `
        <p>${details.description}</p>
        <div id="links">${linkToProject} ${linkToMoreInfo}</div>
        <hr />
      `,
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
