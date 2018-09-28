import Inferno, { Component } from "inferno";
import "./legend.css";

const layers = {
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
    full: "Transportation Improvement Projects",
    sub: "FY2019–FY2022"
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
    sub: "Pennsylvania, 2015 (DVRPC)"
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
      ["Agriculture", "rgb(215,215,158)"],
      ["Commercial", "rgb(255,0,0)"],
      ["Industrial", "rgb(194,158,215)"],
      ["Institutional", "rgb(190,232,255)"],
      ["Residential", "rgb(255,255,0)"],
      ["Military", "rgb(0,132,168)"],
      ["Mining", "rgb(168,0,0)"],
      ["Recreation", "rgb(230,230,230)"],
      ["Transportation", "rgb(104,104,104)"],
      ["Undeveloped", "rgb(165,245,122)"],
      ["Utility", "rgb(255,190,190)"],
      ["Wooded", "rgb(76,230,0)"],
      ["Water", "rgb(0,197,255)"]
    ],
    full: "Land Use",
    sub: "DVRPC (2015)"
  }
};

class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: ""
    };
  }

  toggleActiveLayer = (parent, clickedItem) => {
    parent.childNodes.forEach(layer => {
      const layerID = layer.id.split("-")[1];
      layerID === clickedItem
        ? layer.classList.add("active")
        : layer.classList.remove("active");
    });
  };

  // take advantage of event bubbling by putting the listener on the ul and getting li from that
  updateLegendVisibility = e => {
    const legendItem = e.target.id.split("-")[1];

    // call function to make active and deactivate the others
    this.toggleActiveLayer(e.target.parentNode, legendItem);

    // flip selected & set up the jawns
    this.setState({ selected: legendItem });
  };

  render() {
    return (
      <div
        className={`legend-menu ${this.props.show}`}
        ref={el => (this.legend = el)}
      >
        <ul className="legend-links" onClick={this.updateLegendVisibility}>
          <li className="legendLink" id="legendLink-TIP">
            TIP
          </li>
          <li className="legendLink" id="legendLink-IPD">
            IPD
          </li>
          <li className="legendLink" id="legendLink-CMP">
            CMP
          </li>
          <li className="legendLink" id="legendLink-LRP">
            LRP
          </li>
          <li className="legendLink" id="legendLink-Freight">
            Freight
          </li>
          <li className="legendLink" id="legendLink-LU">
            Land Use
          </li>
        </ul>

        {this.state.selected ? (
          <div
            className={"legendItem-container"}
            id={`legendItem-${this.state.selected}`}
          >
            <h2 className="legendItem-title">
              {layers[this.state.selected].full}
            </h2>
            <h4 className="legendItem-subtitle">
              {layers[this.state.selected].sub}
            </h4>
            <table
              className={"legendItem-content"}
              id={`legendTable-${this.state.selected}`}
            >
              {layers[this.state.selected].classifications.map(row => {
                return (
                  <tr>
                    <td
                      style={{
                        height: "25px",
                        width: "25px",
                        backgroundColor: `${row[1]}`,
                        borderRadius: "3px"
                      }}
                    />
                    <td>{row[0]}</td>
                  </tr>
                );
              })}
            </table>
          </div>
        ) : null}
      </div>
    );
  }
}

export default Legend;
