/*** ACTIONS ***/
const POST_COMMENT = "POST_COMMENT";

/*** ACTION_CREATORS ***/
const post_comment = comment => ({ type: POST_COMMENT, comment });

/*** REDUCERS ***/
export default function tipReducer(state = [], action) {
  switch (action.type) {
    case POST_COMMENT:
      return Object.assign({}, state, { comment: action.comment });
    default:
      return state;
  }
}

/*** DISPATCHERS ***/
export const submitComment = comment => dispatch => {
  // POST to the comment db
  fetch("comment endpoint goes here", { method: "post", body: comment }).then(
    response => {
      // placeholder for now until the api gets set up
      if (response === 200) {
        console.log("commented successfully posted to database");
      } else {
        console.log("failed to post comment to database");
      }
    }
  );
};
