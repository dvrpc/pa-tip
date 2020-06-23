import React, { Component } from "react";
import { connect } from "react-redux";

import "./Comments.css";
import { POSTComment } from "./POSTComment.js";
import { submitComment } from "../../redux/reducers/commentsReducer.js";

class Comments extends Component {
  render() {
    const mpms = this.props.mpms || null;
    const submit = this.props.submitComment;
    return (
      <div
        className="comments no-print"
        id="comments-anchor"
        ref={el => {
          this.comments = el;
        }}
      >
        <h2 style={{ color: `${this.props.headerColor}` }}>
          Submit a comment on the Draft DVRPC FY2021 TIP for Pennsylvania
        </h2>
        <form
          className="comments-form"
          onSubmit={e => POSTComment(submit, mpms, e)}
        >
          <textarea placeholder="Enter your public comment here" />
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
            <select className="comment-form-info" name="county" required>
              <option value="">county</option>
              <option value="Bucks">Bucks County</option>
              <option value="Burlington">Burlington County</option>
              <option value="Camden">Camden County</option>
              <option value="Chester">Chester County</option>
              <option value="Delaware">Delaware County</option>
              <option value="Gloucester">Gloucester County</option>
              <option value="Philadelphia">Philadelphia County</option>
              <option value="Mercer">Mercer County</option>
              <option value="Montgomery">Montgomery County</option>
              <option value="Other">Other</option>
            </select>
          </div>
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
