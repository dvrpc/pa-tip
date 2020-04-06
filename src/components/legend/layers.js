export const layers = {
  TIP: {
    classifications: [
      ["Streetscape", "#0b6d32"],
      ["Bicycle/Pedestrian Improvement", "#f26522"],
      ["Bridge Repair/Replacement", "#223860"],
      ["Transit Improvements", "#729faa"],
      ["Roadway Rehabilitation", "#511851"],
      ["Roadway New Capacity", "#9d1d20"],
      ["Intersection/Interchange Improvements", "#ffc10e"],
      ["Other", "#5abf41"]
    ],
    full: "Transportation Improvement Project Categories",
    sub: "FY20–FY23"
  },
  IPD: {
    classifications: [
      [9, "#ffffd9"],
      [13, "#edf8b1"],
      [15, "#c7e9b4"],
      [17, "#7fcdbb"],
      [19, "#41b6c4"],
      [21, "#1d91c0"],
      [24, "#225ea8"],
      [27, "#253494"],
      [30, "#081d58"]
    ],
    full: "Indicators of Potential Disadvantage",
    sub: "Composite Score"
  },
  CMP: {
    classifications: [
      ["I-295 NJ Turnpike (N)", "#82d4f2"],
      ["I-295 NJ Turnpike (S)", "#37c3f2"],
      ["AC Expressway/NJ 42", "#b57db7"],
      ["US 1, US 206", "#91d3c8"],
      ["US 30", "#d7c19e"],
      ["US 130", "#f9bdbf"],
      ["US 322 & Cross Keys Area", "#8ac867"],
      ["NJ 31", "#fcebad"],
      ["NJ 33", "#d7b19e"],
      ["NJ 38", "#ffd380"],
      ["NJ 41, 45, 47, 55", "#91d3c8"],
      ["NJ 70", "#f4c0d9"],
      ["NJ 73", "#d9bedb"],
      ["CR 571", "#f7cb7a"]
    ],
    full: "CMP Corridors",
    sub: "New Jersey, 2015 (DVRPC)"
  },
  LRP: {
    classifications: [
      ["Metropolitan Center", "#f26522"],
      ["Metropolitan Subcenter", "#223860"],
      ["Suburban Center", "#0b6d32"],
      ["Town Center", "#729faa"],
      ["Rural Center", "#ed1c24"],
      ["Planned Town Center", "#9d1d20"]
    ],
    full: "Planning Centers",
    sub: "DVRPC Connections 2045 Long-Range Plan"
  },
  Freight: {
    classifications: [
      ["International Gateway", "#f4bd48"],
      ["Heavy Industrial", "#ef7e51"],
      ["Distribution and Logistics", "#ca4b66"],
      ["High Tech Manufacturing", "#883272"],
      ["Local Manufacturing and Distribution", "#312867"]
    ],
    full: "Freight Centers",
    sub: "DVRPC Connections 2045 Long-Range Plan"
  },
  LU: {
    classifications: [
      ["Agriculture", "rgba(215,215,158, 0.5)"],
      ["Commercial", "rgba(255,0,0, 0.5)"],
      ["Industrial", "rgba(194,158,215, 0.5)"],
      ["Institutional", "rgba(190,232,255, 0.5)"],
      ["Residential", "rgba(255,255,0, 0.5)"],
      ["Military", "rgba(0,132,168, 0.5)"],
      ["Mining", "rgba(168,0,0, 0.5)"],
      ["Recreation", "rgba(230,230,230, 0.5)"],
      ["Transportation", "rgba(104,104,104, 0.5)"],
      ["Undeveloped", "rgba(165,245,122, 0.5)"],
      ["Utility", "rgba(255,190,190, 0.5)"],
      ["Wooded", "rgba(76,230,0, 0.5)"],
      ["Water", "rgba(0,197,255, 0.5)"]
    ],
    full: "Land Use",
    sub: "DVRPC (2015)"
  },
  Urban: {
    classifications: [
      ["Allentown, PA--NJ", "rgba(0, 219, 219, 0.5)"],
      ["Atlantic City, NJ", "rgba(230, 0, 0, 0.5)"],
      ["East Stroudsburg, PA--NJ", "rgba(54, 84, 135, 0.5)"],
      ["New York--Newark, NY--NJ--CT", "rgba(115, 115, 0, 0.5)"],
      ["Philadelphia, PA--NJ--DE--MD", "rgba(230, 117, 83, 0.5)"],
      ["Poughkeepsie--Newburgh, NY--NJ", "rgba(255, 211, 127, 0.5)"],
      ["Trenton, NJ", "rgba(0, 115, 76, 0.5)"],
      ["Twin Rivers--Hightstown, NJ", "rgba(85, 255, 0, 0.5)"],
      ["Villas, NJ", "rgba(197, 96, 247, 0.5)"],
      ["Vineland, NJ", "rgba(115, 0, 76, 0.5)"]
    ],
    full: "Urbanized Areas",
    sub: "NJDOT (2017)"
  }
};
