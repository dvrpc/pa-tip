/*** ACTIONS ***/
const GET_TIP_KEYWORDS = "GET_TIP_KEYWORDS";
const GET_TIP_BY_MUNICIPAL_BOUNDARIES = "GET_TIP_BY_MUNICIPAL_BOUNDARIES";
const GET_TIP_BY_ADDRESS = "GET_TIP_BY_ADDRESS";
const GET_FULL_TIP = "GET_FULL_TIP";
const SET_MAP_CENTER = "SET_MAP_CENTER";
const GET_TIP_BY_MAP_BOUNDS = "GET_TIP_BY_MAP_BOUNDS";

/*** ACTION_CREATORS ***/
const get_tip_keywords = keyword => ({ type: GET_TIP_KEYWORDS, keyword });
const get_full_tip = id => ({ type: GET_FULL_TIP, id });
const get_tip_by_municipal_boundaries = geoData => ({
  type: GET_TIP_BY_MUNICIPAL_BOUNDARIES,
  geoData
});
const get_tip_by_address = address => ({ type: GET_TIP_BY_ADDRESS, address });
const set_map_center = latlng => ({ type: SET_MAP_CENTER, latlng });
const get_tip_by_map_bounds = bounds => ({
  type: GET_TIP_BY_MAP_BOUNDS,
  bounds
});

/*** REDUCERS ***/
export default function tipReducer(state = [], action) {
  switch (action.type) {
    case GET_TIP_KEYWORDS:
      return Object.assign({}, state, { keyword: action.keyword });
    case GET_TIP_BY_MUNICIPAL_BOUNDARIES:
      return Object.assign({}, state, { geoData: action.geoData });
    case GET_TIP_BY_ADDRESS:
      return Object.assign({}, state, { address: action.address });
    case SET_MAP_CENTER:
      return Object.assign({}, state, { center: action.latlng });
    case GET_TIP_BY_MAP_BOUNDS:
      return Object.assign({}, state, { projects: action.bounds });
    case GET_FULL_TIP:
      return Object.assign({}, state, { details: action.id });
    default:
      return state;
  }
}

/*** DISPATCHERS ***/
// fallback case that gets tip projects by keywords
export const getTIPByKeywords = keyword => dispatch => {
  fetch(`https://www.dvrpc.org/data/tip/2019/list/${keyword}`).then(response =>
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

// TODO: maybe delete this is could be obsolete
export const getTIPByAddress = address => dispatch => {
  console.log("address is ", address);
};

export const setMapCenter = latlng => dispatch =>
  dispatch(set_map_center(latlng));

// get all projects within the boundaires of the current mapbox view
export const getTIPByMapBounds = bounds => dispatch => {
  fetch(
    `https://arcgis.dvrpc.org/arcgis/rest/services/Transportation/PATIP/FeatureServer/0/query?geometry=${bounds}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=true&outSR=4326&f=json`
  ).then(response =>
    response.json().then(projects => dispatch(get_tip_by_map_bounds(projects)))
  );
};

// gets the full information for a project to display in the modal when a tile is clicked
export const getFullTIP = id => dispatch => {
  fetch(`http://staging.dvrpc.org/data/tip/2019/id/${id}`).then(response =>
    response
      .json()
      .then(projectDetails => dispatch(get_full_tip(projectDetails)))
  );
};
