/*** ACTIONS ***/
const GET_TIP_KEYWORDS = "GET_TIP_KEYWORDS";
const GET_TIP_BY_MUNICIPAL_BOUNDARIES = "GET_TIP_BY_MUNICIPAL_BOUNDARIES";
const GET_TIP_BY_ADDRESS = "GET_TIP_BY_ADDRESS";
const GET_FULL_TIP = "GET_FULL_TIP";
const SET_MAP_CENTER = "SET_MAP_CENTER";

/*** ACTION_CREATORS ***/
const get_tip_keywords = keyword => ({ type: GET_TIP_KEYWORDS, keyword });
const get_full_tip = id => ({ type: GET_FULL_TIP, id });
const get_tip_by_municipal_boundaries = geoData => ({
  type: GET_TIP_BY_MUNICIPAL_BOUNDARIES,
  geoData
});
const get_tip_by_address = address => ({ type: GET_TIP_BY_ADDRESS, address });
const set_map_center = latlng => ({ type: SET_MAP_CENTER, latlng });

/*** REDUCERS ***/
export default function tipReducer(state = [], action) {
  switch (action.type) {
    case GET_TIP_KEYWORDS:
      return Object.assign({}, state, { keyword: action.keyword });
    case GET_TIP_BY_MUNICIPAL_BOUNDARIES:
      console.log("hit the get geometry jawn with: ", action.geoData);
      return Object.assign({}, state, { geoData: action.geoData });
    case GET_TIP_BY_ADDRESS:
      console.log("got that address jawn ", action.address);
      return Object.assign({}, state, { address: action.address });
    case GET_FULL_TIP:
      return Object.assign({}, state, { details: action.id });
    case SET_MAP_CENTER:
      return Object.assign({}, state, { center: action.latlng });
    default:
      return state;
  }
}

/*** DISPATCHERS ***/
// fallback case that gets tip projects by keywords
export const getTIPByKeywords = keyword => dispatch => {
  fetch(`http://staging.dvrpc.org/data/tip/2019/list/${keyword}`).then(
    response =>
      response.json().then(projects => dispatch(get_tip_keywords(projects)))
  );
};

// case that gets tip projects by municipal boundaries
export const getTIPByMunicipalBoundaries = id => dispatch => {
  fetch(
    `https://arcgis.dvrpc.org/arcgis/rest/services/Transportation/PATIP/FeatureServer/0/query?where=MPMS_ID%3D${id}&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&f=pjson`
  ).then(response =>
    response
      .json()
      .then(responseGeometry =>
        dispatch(get_tip_by_municipal_boundaries(responseGeometry))
      )
  );
};

// TODO: make two functions here
// 1 that receives the lat/long from search and uses it to update the center of the map
// 1 that receives the bounded box from the updated map center and uses that to make a an arcGIS call
// case that gets tip projects surrounding a specific address
export const getTIPByAddress = address => dispatch => {
  // need to somehow get the mapboxGL boxbounds from this ishhhh
  // with the geocoded address, update the center props in the store which map will access
  console.log("address is ", address);
};

export const setMapCenter = latlng => dispatch => {
  console.log("set map center hit with ", latlng);
  dispatch(set_map_center(latlng));
};

// gets the full information for a project to display in the modal when a tile is clicked
export const getFullTIP = id => dispatch => {
  fetch(`http://staging.dvrpc.org/data/tip/2019/id/${id}`).then(response =>
    response
      .json()
      .then(projectDetails => dispatch(get_full_tip(projectDetails)))
  );
};
