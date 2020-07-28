import React, { Component } from "react";

import "../comments/Comments.css";

// This component will replace the comment form in Project.js once the public comment period is over
class ReadOnlyComments extends Component {
  render() {
    const { comments } = this.props;
    console.log("props ", this.props);
    console.log("comments at readonly ", comments);
    return (
      <div className="comments" id="comments-anchor">
        {comments.length ? (
          <ul className="list-group">
            {comments.map(comment => (
              <li
                className="list-group-item"
                style={{ borderBottom: "1px solid #fff" }}
              >
                <h3>
                  Comment from <b>{comment.name}</b>
                </h3>
                <p>{comment.comment_text}</p>
                {comment.responses.length && (
                  <ul className="list-group">
                    {comment.responses.map(response => (
                      <li className="comment-response">
                        <details>
                          <summary>
                            Click to view response from <b>{response.agency}</b>
                          </summary>
                          <p>{response.response_text}</p>
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
