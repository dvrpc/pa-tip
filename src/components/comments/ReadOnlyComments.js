import Inferno, { Component } from "inferno";

import "../comments/Comments.css";

class ReadOnlyComments extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { comments } = this.props;
    return (
      <div className="comments" id="comments-anchor">
        <h1>{this.props.title}</h1>
        {comments.length ? (
          <ul class="list-group">
            {comments.map(comment => (
              <li
                class="list-group-item"
                style={{ borderBottom: "1px solid #fff", color: "#fff" }}
              >
                <b>{comment.name}</b>
                <p style={{ whiteSpace: "pre-line" }}>{comment.comment_text}</p>
                {comment.responses.length && (
                  <ul class="list-group">
                    {comment.responses.map(response => (
                      <li
                        class="list-group-item"
                        style={{
                          margin: "1rem 0",
                          padding: "1rem",
                          backgroundColor: "#666"
                        }}
                      >
                        <b>{response.agency}</b>
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
