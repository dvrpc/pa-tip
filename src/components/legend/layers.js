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
    full: "TIP Project Categories",
    sub: "FY21–FY24"
  },
  IPD: {
    classifications: [
      [9, "#ffffcc"],
      [10, "#f0fac0"],
      [11, "#dff5b3"],
      [12, "#cbf0a5"],
      [13, "#b2eb98"],
      [14, "#98e68c"],
      [15, "#80e083"],
      [16, "#74db8b"],
      [17, "#69d693"],
      [18, "#66d596"],
      [19, "#5ed19f"],
      [20, "#56ccac"],
      [21, "#4ac7bc"],
      [22, "#41b7c4"],
      [23, "#3facbf"],
      [24, "#3b94b8"],
      [25, "#3789b3"],
      [26, "#357fb0"],
      [27, "#3373ab"],
      [28, "#3169a8"],
      [29, "#2e5da3"],
      [30, "#2c529e"],
      [31, "#2a489c"],
      [32, "#273f96"],
      [33, "#253494"]
    ],
    horizontal: true,
    full: "Title VI and Environmental Justice (EJ) populations",
    sub:
      'The IPD analysis identifies populations of interest under Title VI and EJ using U.S. Census American Community Survey (ACS) 2014-2018 five-year estimates data and maps these populations in each of the Census tracts in the region via GIS. Each population group is an “indicator” in the analysis and includes the following: youth, older adults, female, racial minority, ethnic minority, foreign-born, limited English proficiency, disabled, and low-income. For more information, explore the <a href="">Equity Analysis webmap</a>.'
  },
  CMP: {
    classifications: [
      ["PA 611 & PA 309", "#80AEDD"],
      ["US 202, 322, 30, PA 100", "#82D4F2"],
      ["I-276 (PA Turnpike)", "#92D3C8"],
      ["Ridge-Lincoln-Cheltenham", "#9DCB3B"],
      ["PA 3 & Center City", "#B57DB6"],
      ["US 13/MacDade Blvd/PA 291", "#C7E6DC"],
      ["US 30", "#D7C19E"],
      ["PA 332", "#D7D79E"],
      ["US 422", "#DABEDB"],
      ["PA 132_63, Co. Line Rd", "#DB7DB3"],
      ["I-476", "#F37D80"],
      ["PA 113 area", "#FAF078"],
      ["I-95", "#F9BDBF"],
      ["I-76 & I-676", "#FBF7C0"],
      ["US 1", "#FFD380"],
      ["PA 100", "#FFEBBE"]
    ],
    full: "CMP Corridors",
    sub: "Pennsylvania, 2019 (DVRPC)"
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
  }
};
