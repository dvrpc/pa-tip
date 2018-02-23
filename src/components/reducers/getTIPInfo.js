// actions
const GET_TIP = "GET_TIP";

// action creators
const get_tip = address => ({ type: GET_TIP, address });

// initial state
const initialState = {
  address: ""
};

// reducers
export default function tipReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TIP:
      return action.address;
      break;
    default:
      return state;
  }
}

// dispatchers
export const getTIP = address => dispatch => {
  fetch(`http://staging.dvrpc.org/data/tip/2019/list/${address}`).then(
    response => {
      const projects = response.json();
      console.log("fetched projects with a given address ", projects);
    }
  );

  //TODO: make API call once address is received
  dispatch(get_tip(address));
};
