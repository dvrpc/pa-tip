const ipd = {
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
      ["get", "IPD_Score"],
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
  }
};
const cmp = {
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
};
const connections = {
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
};
const freight = {
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
};
const landUse = {
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
};

export default { ipd, cmp, connections, freight, landUse };
