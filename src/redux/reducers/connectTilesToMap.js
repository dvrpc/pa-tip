/*** ACTIONS ***/
const GET_MARKER_INFO = "GET_MARKER_INFO";

/*** ACTION_CREATORS ***/
const get_marker_info = markerInfo => ({
  type: GET_MARKER_INFO,
  markerInfo
});

/*** REDUCERS ***/
export default function connectTilesToMap(state = [], action) {
  switch (action.type) {
    case GET_MARKER_INFO:
      return Object.assign({}, state, {
        markerInfo: action.markerInfo
      });
    default:
      return [];
  }
}

/*** DISPATCHERS ***/
export const getMarkerInfo = markerInfo => dispatch =>
  dispatch(get_marker_info(markerInfo));
