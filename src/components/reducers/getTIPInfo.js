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
      // calling the LIST api returns an object with cateogry, county, id, road_name and description (but description hasn't showed up yet...)
      console.log("action is ", action.projects);
      return action;
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
      dispatch(get_tip(projects));
    }
  );

  //TODO: make API call once address is received
};
