const IPD = {
  source: {
    name: "IPD",
    type: "geojson",
    data:
      "https://opendata.arcgis.com/datasets/44fdcc72f46e4e3f90126f4f9c5f7629_0.geojson"
  },
  layout: {
    id: "Indicators of Potential Disadvantage",
    type: "fill",
    source: "IPD",
    layout: {
      visibility: "none"
    },
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "IPD_SCORE"],
        9,
        "#ffffd9",
        13,
        "#edf8b1",
        15,
        "#c7e9b4",
        17,
        "#7fcdbb",
        19,
        "#41b6c4",
        21,
        "#1d91c0",
        24,
        "#225ea8",
        27,
        "#253494",
        30,
        "#081d58"
      ],
      "fill-opacity": 0.5
    },
    filter: ["==", "STATE_FIPS", "34"]
  }
};
const CMP = {
  source: {
    name: "CMP",
    type: "geojson",
    data:
      "https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/DVRPC_CMP_2015/FeatureServer/0/query?where=1%3D1&returnGeometry=true&outFields=WEB_COLOR&geometryPrecision=4&outSR=4326&f=pgeojson"
  },
  layout: {
    id: "CMP Corridors",
    type: "fill",
    source: "CMP",
    layout: {
      visibility: "none"
    },
    paint: {
      "fill-color": ["get", "WEB_COLOR"],
      "fill-opacity": 0.8
    }
  }
};
const Connections = {
  source: {
    name: "Connections",
    type: "geojson",
    data:
      "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Connections_2045_Planning_Centers/FeatureServer/0/query?where=State='NJ'&outFields=LUP_TYPE&geometryPrecision=4&outSR=4326&f=pgeojson"
  },
  layout: {
    id: "Connections 2045 Centers",
    type: "fill",
    source: "Connections",
    layout: {
      visibility: "none"
    },
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", "LUP_TYPE"], "Metropolitan Center"],
        "#f26522",
        ["==", ["get", "LUP_TYPE"], "Metropolitan Subcenter"],
        "#223860",
        ["==", ["get", "LUP_TYPE"], "Suburban Center"],
        "#0b6d32",
        ["==", ["get", "LUP_TYPE"], "Town Center"],
        "#729faa",
        ["==", ["get", "LUP_TYPE"], "Rural Center"],
        "#ed1c24",
        ["==", ["get", "LUP_TYPE"], "Planned Town Center"],
        "#9d1d20",
        "#cccccc"
      ],
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        7,
        0.75,
        9,
        0.5,
        11,
        0.25
      ]
    }
  }
};
const Freight = {
  source: {
    name: "Freight",
    type: "geojson",
    data:
      "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Connections_2045_Freight_Centers/FeatureServer/0/query?where=1%3D1&outFields=TYPES&outSR=4326&f=geojson"
  },
  layout: {
    id: "Freight Centers",
    type: "fill",
    source: "Freight",
    layout: {
      visibility: "none"
    },
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", "TYPES"], "International Gateway"],
        "#f4bd48",
        ["==", ["get", "TYPES"], "Heavy Industrial"],
        "#ef7e51",
        ["==", ["get", "TYPES"], "Distribution and Logistics"],
        "#ca4b66",
        ["==", ["get", "TYPES"], "High Tech Manufacturing"],
        "#883272",
        ["==", ["get", "TYPES"], "Local Manufacturing and Distribution"],
        "#312867",
        "#cccccc"
      ],
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        7,
        0.75,
        9,
        0.5,
        11,
        0.25
      ]
    }
  }
};
const LandUse = {
  source: {
    name: "LandUse",
    type: "vector",
    url: "https://tiles.dvrpc.org/data/dvrpc-landuse-2015.json"
  },
  layout: {
    id: "DVRPC Land Use (2015)",
    type: "fill",
    source: "LandUse",
    layout: {
      visibility: "none"
    },
    "source-layer": "lu2015",
    paint: {
      "fill-color": [
        "step",
        ["to-number", ["get", "lu15sub"]],
        "rgb(255, 255, 0)",
        3000,
        "rgb(194,158,215)",
        4000,
        "rgb(104,104,104)",
        5000,
        "rgb(255,190,190)",
        6000,
        "rgb(255,0,0)",
        7000,
        "rgb(190,232,255)",
        8000,
        "rgb(0,132,168)",
        9000,
        "rgb(230,230,0)",
        10000,
        "rgb(215,215,158)",
        11000,
        "rgb(168,0,0)",
        12000,
        "rgb(76,230,0)",
        13000,
        "rgb(0,197,255)",
        14000,
        "rgb(165,245,122)"
      ],
      "fill-opacity": [
        "interpolate",
        ["linear"],
        ["zoom"],
        0,
        1,
        7,
        0.75,
        9,
        0.5,
        11,
        0.25
      ]
    }
  }
};
const UrbanizedAreas = {
  source: {
    name: "UrbanizedAreas",
    type: "geojson",
    data:
      "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Urban_Areas/FeatureServer/1/query?where=LSAD_TYPE%3D'Urbanized+Area'&sqlFormat=standard&geometryPrecision=4&outSR=4326&outFields=CENSUS_UA_&f=pgeojson"
  },
  layout: {
    id: "Urbanized Areas",
    type: "fill",
    source: "UrbanizedAreas",
    layout: {
      visibility: "none"
    },
    paint: {
      "fill-color": [
        "case",
        ["==", ["get", "CENSUS_UA_"], "03898"],
        "#e60000",
        ["==", ["get", "CENSUS_UA_"], "90658"],
        "#c560f7",
        ["==", ["get", "CENSUS_UA_"], "25849"],
        "#365487",
        ["==", ["get", "CENSUS_UA_"], "01495"],
        "#00DBDB",
        ["==", ["get", "CENSUS_UA_"], "90730"],
        "#73004C",
        ["==", ["get", "CENSUS_UA_"], "71803"],
        "#FFD37F",
        ["==", ["get", "CENSUS_UA_"], "88462"],
        "#00734C",
        ["==", ["get", "CENSUS_UA_"], "89263"],
        "#55FF00",
        ["==", ["get", "CENSUS_UA_"], "63217"],
        "#737300",
        ["==", ["get", "CENSUS_UA_"], "69076"],
        "#E67553",
        "#b4b4b4"
      ]
    }
  }
};

export default { IPD, CMP, Connections, Freight, LandUse, UrbanizedAreas };
