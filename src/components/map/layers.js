const IPD = {
  id: "Indicators of Potential Disadvantage",
  data:
    "https://arcgis.dvrpc.org/portal/rest/services/Demographics/IPD_2018/FeatureServer/0/query?where=geoid10+like+%2742%25%27&outFields=IPD_SCORE&outSR=4326&f=geojson",
  layerType: "geojson",
  type: "fill",
  source: "IPD",
  paint: {
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "ipd_score"],
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
};
const CMP = {
  id: "CMP Corridors",
  data:
    "https://arcgis.dvrpc.org/portal/rest/services/Transportation/CMP2019_CorridorSubCorridorAreas/FeatureServer/0/query?where=state='PA'&outFields=WEB_COLOR&returnGeometry=true&geometryPrecision=4&outSR=4326&f=geojson",
  layerType: "geojson",
  type: "fill",
  source: "CMP",
  paint: {
    "fill-color": ["get", "web_color"],
    "fill-opacity": 0.8
  }
};
const Connections = {
  id: "Connections 2045 Centers",
  data:
    "https://arcgis.dvrpc.org/portal/rest/services/Planning/LRP_2045_PlanningCenters/FeatureServer/0/query?where=1=1&outFields=lup_type&geometryPrecision=4&outSR=4326&f=geojson",
  layerType: "geojson",
  type: "fill",
  source: "Connections",
  paint: {
    "fill-color": [
      "case",
      ["==", ["get", "lup_type"], "Metropolitan Center"],
      "#f26522",
      ["==", ["get", "lup_type"], "Metropolitan Subcenter"],
      "#223860",
      ["==", ["get", "lup_type"], "Suburban Center"],
      "#0b6d32",
      ["==", ["get", "lup_type"], "Town Center"],
      "#729faa",
      ["==", ["get", "lup_type"], "Rural Center"],
      "#ed1c24",
      ["==", ["get", "lup_type"], "Planned Town Center"],
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
};
const Freight = {
  id: "Freight Centers",
  data:
    "https://arcgis.dvrpc.org/portal/rest/services/Planning/LRP_2045_Freight_Centers/FeatureServer/0/query?where=1%3D1&outFields=types&outSR=4326&f=geojson",
  layerType: "geojson",
  type: "fill",
  source: "Freight",
  paint: {
    "fill-color": [
      "case",
      ["==", ["get", "types"], "International Gateway"],
      "#f4bd48",
      ["==", ["get", "types"], "Heavy Industrial"],
      "#ef7e51",
      ["==", ["get", "types"], "Distribution and Logistics"],
      "#ca4b66",
      ["==", ["get", "types"], "High Tech Manufacturing"],
      "#883272",
      ["==", ["get", "types"], "Local Manufacturing and Distribution"],
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
};
const LandUse = {
  id: "DVRPC Land Use (2019)",
  url: "https://tiles.dvrpc.org/data/dvrpc-landuse-2015.json",
  layerType: "vector",
  type: "fill",
  source: "LandUse",
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
};

export default { IPD, CMP, Connections, Freight, LandUse };
