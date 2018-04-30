/*** ACTIONS ***/
const GET_TIP_KEYWORDS = "GET_TIP_KEYWORDS";
const GET_TIP_BY_ADDRESS = "GET_TIP_BY_ADDRESS";
const GET_FULL_TIP = "GET_FULL_TIP";
const SET_MAP_CENTER = "SET_MAP_CENTER";
const SET_MAP_STATE = "SET_MAP_STATE";
const SET_CURRENT_PROJECT = "SET_CURRENT_PROJECT";
const GET_TIP_BY_MAP_BOUNDS = "GET_TIP_BY_MAP_BOUNDS";
const SET_FILTER = "SET_FILTER";

/*** ACTION_CREATORS ***/
const get_tip_keywords = keyword => ({ type: GET_TIP_KEYWORDS, keyword });
const get_full_tip = id => ({ type: GET_FULL_TIP, id });
const set_map_center = latlng => ({ type: SET_MAP_CENTER, latlng });
const set_map_state = position => ({ type: SET_MAP_STATE, position });
const set_current_project = props => ({ type: SET_CURRENT_PROJECT, props });
const get_tip_by_map_bounds = bounds => ({
  type: GET_TIP_BY_MAP_BOUNDS,
  bounds
});
const set_filter = category => ({ type: SET_FILTER, category });

/*** REDUCERS ***/
export default function tipReducer(state = [], action) {
  switch (action.type) {
    case GET_TIP_KEYWORDS:
      return Object.assign({}, state, { keyword: action.keyword });
    case SET_MAP_CENTER:
      return Object.assign({}, state, { center: action.latlng });
    case SET_MAP_STATE:
      return Object.assign({}, state, { position: action.position });
    case SET_CURRENT_PROJECT:
      return Object.assign({}, state, { currentProject: action.props });
    case GET_TIP_BY_MAP_BOUNDS:
      return Object.assign({}, state, { projects: action.bounds });
    case GET_FULL_TIP:
      return Object.assign({}, state, { details: action.id });
    case SET_FILTER:
      return Object.assign({}, state, { category: action.category });
    default:
      return state;
  }
}

/*** DISPATCHERS ***/
export const getTIPByKeywords = keyword => dispatch => {
  fetch(`https://www.dvrpc.org/data/tip/2019/list/${keyword}`).then(
    response => {
      response.json().then(projects => {
        // get geometry & rest of project information from the arcGIS server
        let mpms_array = projects.map(project => project.id).join(",");
        let params = {
          where: `MPMS_ID in (${mpms_array})`,
          srOut: 4326,
          f: "pjson",
          outFields: "FID,CTY,MPMS_ID,ROAD_NAME,DESCRIPTIO,LAG,LNG",
          returnGeometry: false
        };
        //Encode the data
        const request = Object.keys(params)
          .map(key => {
            return (
              encodeURIComponent(key) + "=" + encodeURIComponent(params[key])
            );
          })
          .join("&");
        fetch(
          `https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/PATIP_FY19/FeatureServer/0/query`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            method: "POST",
            body: request
          }
        ).then(response => {
          response
            .json()
            .then(projects => dispatch(get_tip_keywords(projects)));
        });
      });
    }
  );
};

export const setMapCenter = latlng => dispatch =>
  dispatch(set_map_center(latlng));

export const setMapState = position => dispatch =>
  dispatch(set_map_state(position));

export const setCurrentProject = props => dispatch =>
  dispatch(set_current_project(props));

export const setFilter = category => dispatch => {
  dispatch(set_filter(category));
};

// get all projects within the boundaires of the current mapbox view
export const getTIPByMapBounds = bounds => dispatch => {
  fetch(
    `https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/PATIP_FY19/FeatureServer/0/query?geometry=${bounds}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=false&outSR=4326&f=json`
  ).then(response =>
    response.json().then(projects => dispatch(get_tip_by_map_bounds(projects)))
  );
};

// gets the full information for a project to display in the modal when a tile is clicked
export const getFullTIP = id => dispatch => {
  fetch(`https://www.dvrpc.org/data/tip/2019/id/${id}`).then(response =>
    response
      .json()
      .then(projectDetails => dispatch(get_full_tip(projectDetails)))
  );
};
