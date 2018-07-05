/*** ACTIONS ***/
const GET_COMMENTS = "GET_COMMENTS";
const POSTED_COMMENT_RESPONSE = "POSTED_COMMENT_RESPONSE";

/*** ACTION_CREATORS ***/
const get_comments = comments => ({ type: GET_COMMENTS, comments });
const posted_comment_response = response => ({
  type: POSTED_COMMENT_RESPONSE,
  response
});

/*** REDUCERS ***/
export default function commentReducer(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      return Object.assign({}, state, { comments: action.comments });
    case POSTED_COMMENT_RESPONSE:
      return Object.assign({}, state, { response: action.response });
    default:
      return state;
  }
}

/*** DISPATCHERS ***/
export const resetCommentBool = bool => dispatch =>
  dispatch(posted_comment_response(false));

export const submitComment = comment => dispatch => {
  // POST to the comment db
  fetch("https://www.dvrpc.org/data/tip/2019/comments", {
    method: "post",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(comment)
  }).then(response => {
    if (response.status === 200) {
      // dispatch a response to notify the user their comment was successfully submitted
      dispatch(posted_comment_response(true));
    } else {
      console.log("failed to post comment to database");
    }
  });
};

export const getGeneralComments = () => dispatch =>
  fetch("https://www.dvrpc.org/data/tip/2019/comments/null")
    .then(response => response.json())
    .then(response => dispatch(get_comments(response)));
