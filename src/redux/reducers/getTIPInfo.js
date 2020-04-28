/*** ACTIONS ***/
const FETCH_TIP_KEYWORDS = "FETCH_TIP_KEYWORDS";
const GET_TIP_KEYWORDS = "GET_TIP_KEYWORDS";
const GET_FULL_TIP = "GET_FULL_TIP";
const SET_MAP_CENTER = "SET_MAP_CENTER";
const SET_MAP_STATE = "SET_MAP_STATE";
const GET_TIP_BY_MAP_BOUNDS = "GET_TIP_BY_MAP_BOUNDS";
const SET_FILTER = "SET_FILTER";
const SET_BOUNDS = "SET_BOUNDS";
const HYDRATE_GEOMETRY = "HYDRATE_GEOMETRY'";

/*** ACTION_CREATORS ***/
const fetch_tip_keywords = fetchedKeywords => ({
  type: FETCH_TIP_KEYWORDS,
  fetchedKeywords
});
const get_tip_keywords = keyword => ({ type: GET_TIP_KEYWORDS, keyword });
const get_full_tip = id => ({ type: GET_FULL_TIP, id });
const set_map_center = latlng => ({ type: SET_MAP_CENTER, latlng });
// @UPDATE remove
const set_map_state = position => ({ type: SET_MAP_STATE, position });
const get_tip_by_map_bounds = features => ({
  type: GET_TIP_BY_MAP_BOUNDS,
  features
});
const set_filter = category => ({ type: SET_FILTER, category });
const set_bounds = bounds => ({ type: SET_BOUNDS, bounds });
const hydrate_geometry = geometry => ({ type: HYDRATE_GEOMETRY, geometry });

/*** REDUCERS ***/
export default function tipReducer(state = [], action) {
  switch (action.type) {
    case FETCH_TIP_KEYWORDS:
      return Object.assign({}, state, {
        fetchedKeywords: action.fetchedKeywords
      });
    case GET_TIP_KEYWORDS:
      return Object.assign({}, state, { keyword: action.keyword });
    case SET_MAP_CENTER:
      return Object.assign({}, state, { center: action.latlng });
    // @UPDATE remove
    case SET_MAP_STATE:
      return Object.assign({}, state, { position: action.position });
    case GET_TIP_BY_MAP_BOUNDS:
      return Object.assign({}, state, { projects: action.features });
    case GET_FULL_TIP:
      return Object.assign({}, state, { details: action.id });
    case SET_FILTER:
      return Object.assign({}, state, { category: action.category });
    case SET_BOUNDS:
      return Object.assign({}, state, { bounds: action.bounds });
    case HYDRATE_GEOMETRY:
      return Object.assign({}, state, { geometry: action.geometry });
    default:
      return state;
  }
}

// take search input and find TIP Projects that satisfy the criteria
const getTIPProjects = input =>
  fetch(`https://www.dvrpc.org/data/tip/2019/list/${input}`)
    .then(response => response.json())
    .then(features => {
      // return empty array for no results
      if (!features[0]) return [];

      // get id, name and set cateogry type for projects
      let mpmsAndNames = features.map(project => {
        return { name: project.road_name, id: project.id, type: "expanded" };
      });

      // trim response to the first 5 entries & return
      mpmsAndNames = mpmsAndNames.slice(0, 5);

      return mpmsAndNames;
    });

/*** DISPATCHERS ***/
export const getTIPByKeywords = keyword => dispatch => {
  // encode in case of multiple word keywords
  keyword = encodeURI(keyword);
  fetch(`https://www.dvrpc.org/data/tip/2019/list/${keyword}`).then(
    response => {
      if (response.ok) {
        response.json().then(projects => {
          // handle keyword searches that do or do not yield a result
          projects = projects.length
            ? projects.map(project => project.id)
            : "empty";
          dispatch(get_tip_keywords(projects));
        });
      } else {
        console.log("failed to fetch keyword projects with status: ", response);
      }
    }
  );
};

//get search results without updating the entire app
export const searchTIPByKeywords = keyword => dispatch => {
  getTIPProjects(keyword).then(projects => {
    dispatch(fetch_tip_keywords(projects));
  });
};

export const clearKeywords = () => dispatch => dispatch(get_tip_keywords(null));

export const setMapCenter = latlng => dispatch =>
  dispatch(set_map_center(latlng));

// @UPDATE remove
export const setMapState = position => dispatch =>
  dispatch(set_map_state(position));

export const setFilter = category => dispatch => {
  dispatch(set_filter(category));
};

export const setBounds = bounds => dispatch => {
  dispatch(set_bounds(bounds));
};

// get all projects within the boundaires of the current mapbox view
export const getTIPByMapBounds = features => dispatch => {
  dispatch(get_tip_by_map_bounds(features));
};

// pull project information from URL for link sharing
export const hydrateGeometry = id => dispatch => {
  // handle resetting of the expanded.js props to solve old components rendering while a new one loads
  if (id === null) return dispatch(hydrate_geometry(null));

  fetch(
    // @TODO: update this
    `https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Pennsylvania_Transportation_Improvement_Program_2019_to_2022/FeatureServer/0/query?where=MPMS_ID=${id}&geometryType=esriGeometryPoint&returnGeometry=true&geometryPrecision=&outSR=4326&f=pgeojson`
  )
    .then(response => {
      if (response.ok)
        response
          .json()
          .then(geoPromise => dispatch(hydrate_geometry(geoPromise)));
    })
    .catch(error => console.error(error));
};

// gets the full information for a project to display in the modal when a tile is clicked
export const getFullTIP = id => dispatch => {
  // handle resetting of the expanded.js props to solve old components rendering while a new one loads
  if (id === null) return dispatch(get_full_tip(null));

  fetch(`https://www.dvrpc.org/data/tip/2019/id/${id}`)
    .then(response => {
      if (response.ok) {
        response
          .json()
          .then(projectDetails => dispatch(get_full_tip(projectDetails)));
      } else {
        const output = { error: true, reason: response.statusText };
        dispatch(get_full_tip(output));
      }
    })
    .catch(error => console.error(error));
};