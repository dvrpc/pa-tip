/*** ACTIONS ***/
const FETCH_TIP_KEYWORDS = "FETCH_TIP_KEYWORDS";
const GET_TIP_KEYWORDS = "GET_TIP_KEYWORDS";
const GET_FULL_TIP = "GET_FULL_TIP";
const SET_MAP_CENTER = "SET_MAP_CENTER";
const SET_MAP_STATE = "SET_MAP_STATE";
const GET_TIP_BY_MAP_BOUNDS = "GET_TIP_BY_MAP_BOUNDS";
const SET_FILTER = "SET_FILTER";
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
    case HYDRATE_GEOMETRY:
      return Object.assign({}, state, { geometry: action.geometry });
    default:
      return state;
  }
}

const keywordRequest = keyword =>
  new Promise(resolve => {
    fetch(`https://www.dvrpc.org/data/tip/2019/list/${keyword}`)
      .then(response => response.json())
      .then(features => {
        // get geometry & rest of project information from the arcGIS server
        let mpms_array = features.map(project => project.id).join(",");
        let params = {
          where: `MPMS_ID in (${mpms_array})`,
          srOut: 4326,
          f: "geojson",
          outFields:
            "OBJECTID,CTY,MPMS_ID,ROAD_NAME,DESCRIPTIO,LATITUDE,LONGITUDE",
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
          `https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Pennsylvania_Transportation_Improvement_Program_2019_to_2022/FeatureServer/0/query`,
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
                feature => feature.properties.MPMS_ID === project.id
              );
              project.properties = matchedProject.length
                ? matchedProject[0].properties
                : {
                    OBJECTID: project.id + project.road_name,
                    CTY: project.county,
                    DESCRIPTIO: project.category,
                    MPMS_ID: project.id,
                    ROAD_NAME: project.road_name,
                    LATITUDE: 40.018,
                    LONGITUDE: -75.148,
                    NOT_MAPPED: true
                  };
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

// get all projects within the boundaires of the current mapbox view
export const getTIPByMapBounds = features => dispatch => {
  dispatch(get_tip_by_map_bounds(features));
};

// pull project information from URL for link sharing
export const hydrateGeometry = id => dispatch => {
  fetch(
    `https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Pennsylvania_Transportation_Improvement_Program_2019_to_2022/FeatureServer/0/query?where=MPMS_ID=${id}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=LATITUDE,LONGITUDE,OBJECTID&returnGeometry=false&outSR=4326&f=json`
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
  fetch(`https://www.dvrpc.org/data/tip/2019/id/${id}`)
    .then(response => {
      if (response.ok)
        response
          .json()
          .then(projectDetails => dispatch(get_full_tip(projectDetails)));
    })
    .catch(error => console.error(error));
};
