import React, { Component } from "react";

import "../comments/Comments.css";

// This component will replace the comment form in expanded.js once the public comment period is over
class ReadOnlyComments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div className="comments" id="comments-anchor">
        <h1>{this.props.title}</h1>
        {comments.length ? (
          <ul className="list-group">
            {comments.map(comment => (
              <li
                className="list-group-item"
                style={{ borderBottom: "1px solid #fff", color: "#fff" }}
              >
                <b>{comment.name}</b>
                <p style={{ whiteSpace: "pre-line" }}>{comment.comment_text}</p>
                {comment.responses.length && (
                  <ul className="list-group">
                    {comment.responses.map(response => (
                      <li
                        className="list-group-item"
                        style={{
                          margin: "1rem 0",
                          padding: "1rem",
                          backgroundColor: "#666"
                        }}
                      >
                        <b>Response from {response.agency}</b>
                        <p style={{ whiteSpace: "pre-line" }}>
                          {response.response_text}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ color: "#fff" }}>
            No comments were received for this project
          </p>
        )}
      </div>
    );
  }
}

export default ReadOnlyComments;
