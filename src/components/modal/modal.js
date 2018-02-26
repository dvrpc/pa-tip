import Inferno, { Component } from "inferno";
import swal from "sweetalert2";

// TODO: update URL when a modal pops up

const getComment = () => console.log("input area submitted a comment");

class Modal extends Component {
  // TODO: POST a user submitted comment to the database (must also create the reducer/dispatcher for this)
  // TODO: GET user submitted comments for any particular project and display them in the modal window
  // TODO: pass ID from the tile into this Modal in order to make the full-information API call
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const footer = `<h2>Add a comment </h2><textarea></textarea><input type="submit" value="submit" >`;
    swal({
      title: this.props.title,
      width: "50%",
      padding: 80,
      html: this.props.html,
      showConfirmButton: false,
      footer: footer
    });
  }
  render() {
    return <div id="modal" />;
  }
}

// TODO: connect to the redux store to dispatch the ID API

export default Modal;
