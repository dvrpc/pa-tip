import React, { Component } from "react";
import swal from "sweetalert2";

class Modal extends Component {
  constructor() {
    super();
  }

  componentDidMount() {
    swal({
      type: "success",
      title: "Comment Successfully posted",
      text: "Thank you for your feedback!",
      showConfirmButton: false,
      timer: 3000
      // update commentBool to hide the message until another comment is posted
    }).then(result => this.props.resetCommentBool(false));
  }

  render() {
    return <div id="modal" />;
  }
}

export default Modal;
