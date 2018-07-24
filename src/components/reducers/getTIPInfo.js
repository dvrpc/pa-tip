/*** ACTIONS ***/
const GET_TIP_KEYWORDS = "GET_TIP_KEYWORDS";
const GET_TIP_BY_ADDRESS = "GET_TIP_BY_ADDRESS";
const GET_FULL_TIP = "GET_FULL_TIP";
const SET_MAP_CENTER = "SET_MAP_CENTER";
const SET_MAP_STATE = "SET_MAP_STATE";
const GET_TIP_BY_MAP_BOUNDS = "GET_TIP_BY_MAP_BOUNDS";
const SET_FILTER = "SET_FILTER";
const HYDRATE_GEOMETRY = "HYDRATE_GEOMETRY'";

/*** ACTION_CREATORS ***/
const get_tip_keywords = keyword => ({ type: GET_TIP_KEYWORDS, keyword });
const get_full_tip = id => ({ type: GET_FULL_TIP, id });
const set_map_center = latlng => ({ type: SET_MAP_CENTER, latlng });
const set_map_state = position => ({ type: SET_MAP_STATE, position });
const get_tip_by_map_bounds = bounds => ({
  type: GET_TIP_BY_MAP_BOUNDS,
  bounds
});
const set_filter = category => ({ type: SET_FILTER, category });
const hydrate_geometry = geometry => ({ type: HYDRATE_GEOMETRY, geometry });

/*** REDUCERS ***/
export default function tipReducer(state = [], action) {
  switch (action.type) {
    case GET_TIP_KEYWORDS:
      return Object.assign({}, state, { keyword: action.keyword });
    case SET_MAP_CENTER:
      return Object.assign({}, state, { center: action.latlng });
    case SET_MAP_STATE:
      return Object.assign({}, state, { position: action.position });
    case GET_TIP_BY_MAP_BOUNDS:
      return Object.assign({}, state, { projects: action.bounds });
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

/*** DISPATCHERS ***/
export const getTIPByKeywords = keyword => dispatch => {
  let keywordProjects;
  fetch(`https://www.dvrpc.org/data/tip/2019/list/${keyword}`).then(
    response => {
      response.json().then(projects => {
        keywordProjects = projects;
        // get geometry & rest of project information from the arcGIS server
        let mpms_array = projects.map(project => project.id).join(",");
        let params = {
          where: `MPMS_ID in (${mpms_array})`,
          srOut: 4326,
          f: "pjson",
          outFields: "OBJECTID,CTY,MPMS_ID,ROAD_NAME,DESCRIPTIO,LAG,LNG",
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
          `https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Pennsylvania_Transportation_Improvement_Program_(TIP)_2019-2022/FeatureServer/0/query`,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            },
            method: "POST",
            body: request
          }
        ).then(arcGISResponse => {
          arcGISResponse.json().then(arcGISProjects => {
            // handle case of projects that do not have geometry (arcGIS return isnt the same as keyword return)
            if (
              arcGISProjects.features &&
              arcGISProjects.features.length !== keywordProjects.length
            ) {
              // get a reference to arcGIS projects by roadName and  index
              let arcClone = {};
              arcGISProjects.features.forEach(
                (project, index) =>
                  (arcClone[project.attributes.ROAD_NAME] = index)
              );

              keywordProjects.forEach(project => {
                // format & add all the missing keyword projects IF they aren't already in the array
                if (
                  arcClone[project.road_name] !== 0 &&
                  !arcClone[project.road_name]
                ) {
                  const formattedKeywordObject = {
                    attributes: {
                      // sham OBJECTID to act as a key for the tile
                      OBJECTID: project.id + project.road_name,
                      CTY: project.county,
                      DESCRIPTIO: project.category,
                      MPMS_ID: project.id,
                      ROAD_NAME: project.road_name,
                      LAG: 40.018,
                      LNG: -75.148
                    }
                  };

                  // if the keyword is an MPMS ID, make it the first result
                  if (project.id == keyword) {
                    arcGISProjects.features.unshift(formattedKeywordObject);
                  } else {
                    arcGISProjects.features.push(formattedKeywordObject);
                  }
                }
              });
            }

            dispatch(get_tip_keywords(arcGISProjects));
          });
        });
      });
    }
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
export const getTIPByMapBounds = bounds => dispatch => {
  fetch(
    `https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Pennsylvania_Transportation_Improvement_Program_(TIP)_2019-2022/FeatureServer/0/query?geometry=${bounds}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=*&returnGeometry=false&outSR=4326&f=json`
  ).then(response =>
    response.json().then(projects => dispatch(get_tip_by_map_bounds(projects)))
  );
};

// pull project information from URL for link sharing
export const hydrateGeometry = id => dispatch => {
  fetch(
    `https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Pennsylvania_Transportation_Improvement_Program_(TIP)_2019-2022/FeatureServer/0/query?where=MPMS_ID=${id}&geometryType=esriGeometryEnvelope&inSR=4326&spatialRel=esriSpatialRelIntersects&outFields=LAG,LNG&returnGeometry=false&outSR=4326&f=json`
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
