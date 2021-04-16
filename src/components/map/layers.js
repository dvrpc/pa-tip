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
/*const Congressional = {
  id: "NJ Congressional Districts",
  data:
    "https://arcgis.dvrpc.org/portal/rest/services/Boundaries/NJ_Congressional/FeatureServer/0/query?where=1%3D1&geometry=%7B%22rings%22%3A%5B%5B%5B-74.8772%2C39.6083%5D%2C%5B-74.9851%2C39.5148%5D%2C%5B-75.1997%2C39.6670%5D%2C%5B-75.2475%2C39.6644%5D%2C%5B-75.3766%2C39.7265%5D%2C%5B-75.4071%2C39.7869%5D%2C%5B-75.3996%2C39.8086%5D%2C%5B-75.3386%2C39.8452%5D%2C%5B-75.2818%2C39.8470%5D%2C%5B-75.1481%2C39.8830%5D%2C%5B-75.1293%2C39.9135%5D%2C%5B-75.1323%2C39.9569%5D%2C%5B-75.0735%2C39.9795%5D%2C%5B-75.0456%2C40.0111%5D%2C%5B-74.9612%2C40.0564%5D%2C%5B-74.8607%2C40.0837%5D%2C%5B-74.8153%2C40.1278%5D%2C%5B-74.7829%2C40.1215%5D%2C%5B-74.7238%2C40.1470%5D%2C%5B-74.7742%2C40.2172%5D%2C%5B-74.8419%2C40.2499%5D%2C%5B-74.8615%2C40.2869%5D%2C%5B-74.9322%2C40.3394%5D%2C%5B-74.8562%2C40.3467%5D%2C%5B-74.8696%2C40.3777%5D%2C%5B-74.8019%2C40.3849%5D%2C%5B-74.8084%2C40.4166%5D%2C%5B-74.7481%2C40.4241%5D%2C%5B-74.7221%2C40.3751%5D%2C%5B-74.6539%2C40.3910%5D%2C%5B-74.6175%2C40.3772%5D%2C%5B-74.6305%2C40.3396%5D%2C%5B-74.5567%2C40.2916%5D%2C%5B-74.4819%2C40.2738%5D%2C%5B-74.4814%2C40.2428%5D%2C%5B-74.5432%2C40.2167%5D%2C%5B-74.5625%2C40.1899%5D%2C%5B-74.6145%2C40.1824%5D%2C%5B-74.5286%2C40.0374%5D%2C%5B-74.3897%2C39.7732%5D%2C%5B-74.3905%2C39.5959%5D%2C%5B-74.4253%2C39.5535%5D%2C%5B-74.4756%2C39.5514%5D%2C%5B-74.5532%2C39.5977%5D%2C%5B-74.6593%2C39.6318%5D%2C%5B-74.6761%2C39.6916%5D%2C%5B-74.7361%2C39.7297%5D%2C%5B-74.8772%2C39.6083%5D%5D%5D%2C%22spatialReference%22%3A%7B%22wkid%22%3A4326%7D%7D&geometryType=esriGeometryPolygon&inSR=4326&spatialRel=esriSpatialRelOverlaps&outFields=*&returnGeometry=true&f=geojson",
  layerType: "geojson",
  type: "line",
  source: "Congressional",
  paint: {
    "line-color": "#000",
  },
  metadata: {
    beforeId: null
  }
};*/
export default {
  IPD,
  CMP,
  Connections,
  Freight,
  LandUse
};
