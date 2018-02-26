// actions
const GET_TIP = "GET_TIP";

// action creators
const get_tip = address => ({ type: GET_TIP, address });

// initial state
const initialState = {
  projects: ""
};

// reducers
export default function tipReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TIP:
      return action;
      break;
    default:
      return state;
  }
}

// dispatchers

// gets basic information about a project to display in tilescontainer on search.
export const getTIP = address => dispatch => {
  fetch(`http://staging.dvrpc.org/data/tip/2019/list/${address}`).then(
    response => response.json().then(projects => dispatch(get_tip(projects)))
  );
};

// gets the full information for a project to display in the modal when a tile is clicked
export const getFullTIP = id => dispatch => {
  fetch(`http://staging.dvrpc.org/data/tip/2019/id/${id}`).then(response => {
    console.log("id endpoint hit with a response of: ", response.json());
  });
};
