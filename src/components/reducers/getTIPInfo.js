// actions
const GET_TIP = "GET_TIP";
const GET_DETAILS = "GET_DETAILS";
const GET_GEOMETRY = "GET_GEOMETRY";

// action creators
const get_tip = address => ({ type: GET_TIP, address });
const get_details = id => ({ type: GET_DETAILS, id });
const get_geometry = geoData => ({ type: GET_GEOMETRY, geoData });

// reducers
export default function tipReducer(state = [], action) {
  switch (action.type) {
    case GET_TIP:
      return Object.assign({}, state, { address: action.address });
    case GET_DETAILS:
      return Object.assign({}, state, { details: action.id });
    case GET_GEOMETRY:
      console.log("hit the get geometry jawn with: ", action.geoData);
      return Object.assign({}, state, { geoData: action.geoData });
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

// query arcGIS with the boundaries of whatever is searched & have it grab ALL TIP projects within that boundary. 1 API call gets all instead of point/pointline/polygon for each project
// once all projects in the boundary are returned, associate the projects with the tiles to set up the background images
// pop them all on the map too
// https://arcgis.dvrpc.org/arcgis/rest/services/Transportation/PATIP/MapServer/identify ---> ask Robert how to query this
export const getGeometry = id => dispatch => {
  fetch(
    `https://arcgis.dvrpc.org/arcgis/rest/services/Transportation/PATIP/FeatureServer/0/query?where=MPMS_ID%3D${id}&objectIds=&time=&geometry=&geometryType=esriGeometryPoint&inSR=&spatialRel=esriSpatialRelIntersects&relationParam=&outFields=&returnGeometry=true&maxAllowableOffset=&geometryPrecision=&outSR=&gdbVersion=&returnDistinctValues=false&returnIdsOnly=false&returnCountOnly=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&returnZ=false&returnM=false&multipatchOption=&f=pjson`
  ).then(response =>
    response
      .json()
      .then(responseGeometry => dispatch(get_geometry(responseGeometry)))
  );
};
