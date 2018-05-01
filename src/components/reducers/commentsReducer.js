/*** ACTIONS ***/
const GET_COMMENTS = "GET_COMMENTS";

/*** ACTION_CREATORS ***/
const get_comments = comments => ({ type: GET_COMMENTS, comments });

/*** REDUCERS ***/
export default function commentReducer(state = [], action) {
  switch (action.type) {
    case GET_COMMENTS:
      return Object.assign({}, state, { comment: action.comments });
    default:
      return state;
  }
}

/*** DISPATCHERS ***/
export const submitComment = comment => dispatch => {
  console.log("comment is ", comment);
  // POST to the comment db
  fetch("https://www.dvrpc.org/data/tip/2019/comments", {
    method: "post",
    headers: {
      "Content-Type": "text/plain"
    },
    body: JSON.stringify(comment)
  }).then(response => {
    console.log("submit comment api response is ", response);
    if (response.status === 200) {
      // when the api is set up, dispatch a response that updates the comments form to let users know they successfully submitted a comment
      console.log("commented successfully posted to database");
    } else {
      console.log("failed to post comment to database");
    }
  });
};
