import React, { Component } from "react";

import "../comments/Comments.css";

// This component will replace the comment form in Project.js once the public comment period is over
class ReadOnlyComments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <div
        className="comments"
        id="comments-anchor"
        style={{
          color: this.props.theme || "initial",
          padding: this.props.padding || "none"
        }}
      >
        {comments.length ? (
          <ul className="list-group">
            {comments.map((comment, index) => (
              <li
                className="list-group-item"
                style={{ borderBottom: "2px solid #fff" }}
                key={`${comment.name} #${index}`}
              >
                <h3>
                  Comment from <b>{comment.name}</b>
                </h3>
                <p>{comment.comment_text}</p>
                {comment.responses.length && (
                  <ul className="list-group">
                    {comment.responses.map((response, indexInner) => (
                      <li
                        className="comment-response"
                        key={`${response.agency} #${indexInner}`}
                      >
                        <details>
                          <summary>
                            Click to view response from <b>{response.agency}</b>
                          </summary>
                          <p className="response-text">
                            {response.response_text}
                          </p>
                        </details>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments were received for this project</p>
        )}
      </div>
    );
  }
}

export default ReadOnlyComments;
