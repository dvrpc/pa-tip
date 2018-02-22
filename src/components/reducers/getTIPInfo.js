// actions
const GET_TIP = "GET_TIP";
const GET_ADDRESS = "GET_ADDRESS";

// action creators
const get_tip = project => ({ type: GET_TIP, project });
const make_search = search => ({ type: GET_ADDRESS, search });

// initial state
const initialState = {
  searched: false,
  address: ""
};

// reducers
export default function tipReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TIP:
      return action.project || [];
      break;
    case GET_ADDRESS:
      return action.search;
    default:
      return state;
  }
}

// dispatchers
/*export const getTIP = projects => dispatch => {
    
}*/
export const updateSearchBool = search => dispatch => make_search(search);
