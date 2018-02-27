// actions
const GET_TIP = "GET_TIP";
const GET_DETAILS = "GET_DETAILS";

// action creators
const get_tip = address => ({ type: GET_TIP, address });
const get_details = id => ({ type: GET_DETAILS, id });

// reducers
export default function tipReducer(state = [], action) {
  switch (action.type) {
    case GET_TIP:
      return Object.assign({}, state, { address: action.address });
    case GET_DETAILS:
      return Object.assign({}, state, { details: action.id });
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
  fetch(`http://staging.dvrpc.org/data/tip/2019/id/${id}`).then(response =>
    response
      .json()
      .then(projectDetails => dispatch(get_details(projectDetails)))
  );
};
