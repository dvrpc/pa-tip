import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./Comments.css";
import { POSTComment } from "../../utils/POSTComment.js";
import { submitComment } from "../reducers/commentsReducer.js";

class Comments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className="comments"
        id="comments-anchor"
        ref={el => {
          this.comments = el;
        }}
      >
        <h1>Leave a Public Comment for This Project</h1>
        <form className="comments-form" onSubmit={linkEvent(this, POSTComment)}>
          <textarea placeholder="Submit a public comment for this project" />
          <div className="input-fields">
            <input
              className="comment-form-info"
              type="text"
              name="name"
              placeholder="full name"
              required
            />
            <input
              className="comment-form-info"
              type="email"
              name="email"
              placeholder="email"
              required
            />
            <select className="custom-select" name="county" required>
              <option value="">county</option>
              <option value="Bucks">Bucks County</option>
              <option value="Chester">Chester County</option>
              <option value="Delaware">Delaware County</option>
              <option value="Philadelphia">Philadelphia County</option>
              <option value="Montgomery">Montgomery County</option>
            </select>
            <input
              id="submitCommentButton"
              type="submit"
              value="submit"
              style={{
                background: this.props.colorScheme
                  ? this.props.colorScheme.darkest
                  : "#e5c942"
              }}
            />
          </div>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    submitComment: comment => dispatch(submitComment(comment))
  };
};
export default connect(null, mapDispatchToProps)(Comments);
