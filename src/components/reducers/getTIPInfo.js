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

const keywordRequest = keyword =>
  new Promise(resolve => {
    fetch(`https://www.dvrpc.org/data/tip/2020/list/${keyword}`)
      .then(response => response.json())
      .then(features => {
        // get geometry & rest of project information from the arcGIS server (nj tip endpoint requires quotes around each ID in the string)
        let id_array = features.map(project => `'${project.id}'`).join(",");
        let params = {
          where: `DBNUM in (${id_array})`,
          srOut: 4326,
          f: "geojson",
          outFields: "OBJECTID,COUNTY,DBNUM,PROJECTNAM,TYPE_DESC,LAT,LONG_",
          returnGeometry: false
        };
        //Encode the data
        const body = Object.keys(params)
          .map(
            key =>
              `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
          )
          .join("&");
        fetch(
          `https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/DVRPC_Draft_New_Jersey_Transportation_Improvement_Program_2020_to_2023/FeatureServer/0/query`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            method: "POST",
            body
          }
        )
          .then(arcGISResponse => arcGISResponse.json())
          .then(arcGISProjects => {
            features.forEach(project => {
              const matchedProject = arcGISProjects.features.filter(
                feature => feature.properties.DBNUM === project.id
              );
              project.properties = matchedProject.length
                ? matchedProject[0].properties
                : {
                    OBJECTID: project.id + project.road_name,
                    CTY: project.county,
                    TYPE_DESC: project.category,
                    DBNUM: project.id,
                    PROJECTNAM: project.road_name,
                    LATITUDE: 39.9,
                    LONGITUDE: -74.875,
                    NOT_MAPPED: true
                  };
              project.properties.LONGITUDE =
                project.properties.LONGITUDE || project.properties.LONG_;
              project.properties.LATITUDE =
                project.properties.LATITUDE || project.properties.LAT;
            });
            resolve({ features });
          });
      });
  });

/*** DISPATCHERS ***/
export const getTIPByKeywords = keyword => (dispatch, getState) => {
  //use already returned projects from search
  if (getState().getTIP.fetchedKeywords !== undefined) {
    dispatch(get_tip_keywords(getState().getTIP.fetchedKeywords));
  } else {
    keywordRequest(keyword).then(arcGISProjects =>
      dispatch(get_tip_keywords(arcGISProjects))
    );
  }
};

//get search results without updating the entire app
export const fetchTIPByKeywords = keyword => dispatch => {
  keywordRequest(keyword).then(arcGISProjects =>
    dispatch(fetch_tip_keywords(arcGISProjects))
  );
};

export const setMapCenter = latlng => dispatch =>
  dispatch(set_map_center(latlng));

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
    `https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/DVRPC_Draft_New_Jersey_Transportation_Improvement_Program_2020_to_2023/FeatureServer/0/query?where=DBNUM=%27${id}%27&geometryType=esriGeometryPoint&returnGeometry=true&geometryPrecision=&outSR=4326&f=pgeojson`
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
// @TODO: there are issues with this endpoint. It seems like projects with DBNUM's that are all numbers work, but ones that have letters in them throw a 400 or 500 error...
export const getFullTIP = id => dispatch => {
  // handle resetting of the expanded.js props to solve old components rendering while a new one loads
  if (id === null) return dispatch(get_full_tip(null));

  fetch(`https://www.dvrpc.org/data/tip/2020/id/${id}`)
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
