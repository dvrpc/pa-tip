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
      console.log("state in GET_TIP ", state);
      console.log("action in GET_TIP ", action);
      return state.address;
      break;
    default:
      return state;
  }
}

// dispatchers
export const getTIP = address => dispatch => {
  //TODO: make API call once address is received
  console.log("address in getTIP ", address);
  dispatch(get_tip(address));
};
