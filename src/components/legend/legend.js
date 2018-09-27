import { withRouter } from "inferno-router";
import Inferno, { Component, linkEvent } from "inferno";
import "./legend.css";

class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "Transportation Improvement Projects": {
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
        short: "TIP",
        sub: "FY2019–FY2022"
      },
      "Indicators of Potential Disadvantage": {
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
        short: "IPD",
        sub: "Composite Score"
      },
      "CMP Corridors": {
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
        short: "CMP",
        sub: "Pennsylvania, 2015 (DVRPC)"
      },
      "Planning Centers": {
        classifications: [
          ["Metropolitan Center", "#f26522"],
          ["Metropolitan Subcenter", "#223860"],
          ["Suburban Center", "#0b6d32"],
          ["Town Center", "#729faa"],
          ["Rural Center", "#ed1c24"],
          ["Planned Town Center", "#9d1d20"]
        ],
        short: "LRP",
        sub: "DVRPC Connections 2045 Long-Range Plan"
      },
      "Freight Centers": {
        classifications: [
          ["International Gateway", "#f4bd48"],
          ["Heavy Industrial", "#ef7e51"],
          ["Distribution and Logistics", "#ca4b66"],
          ["High Tech Manufacturing", "#883272"],
          ["Local Manufacturing and Distribution", "#312867"]
        ],
        short: "Freight",
        sub: "DVRPC Connections 2045 Long-Range Plan"
      },
      "Land Use": {
        classifications: [
          ["Residential", "rgb(255,255,0)"],
          ["Industrial", "rgb(194,158,215)"],
          ["Transportation", "rgb(104,104,104)"],
          ["Utility", "rgb(255,190,190)"],
          ["Commercial", "rgb(255,0,0)"],
          ["Institutional", "rgb(190,232,255)"],
          ["Military", "rgb(0,132,168)"],
          ["Recreation", "rgb(230,230,230)"],
          ["Agriculture", "rgb(215,215,158)"],
          ["Mining", "rgb(168,0,0)"],
          ["Wooded", "rgb(76,230,0)"],
          ["Water", "rgb(0,197,255)"],
          ["Undeveloped", "rgb(165,245,122)"]
        ],
        short: "LU",
        sub: "DVRPC (2015)"
      }
    };
  }

  LegendBuilder = shit => {
    let contentContainer = document.querySelector(`#legendTable-${shit.short}`);
    let tipContainer = document.querySelector("#legendTable-TIP");
    //   if (tipContainer == null){
    //     return (
    //         <div
    //           className={"legendItem-container"}
    //           id={`legendItem-TIP`}
    //         >
    //           <h2 className={"legendItem-title"}>{"Transportation Improvement Projects"}</h2>
    //           <h4 className={"legendItem-subtitle"}>{this.state["Transportation Improvement Projects"].sub}</h4>
    //           <table
    //             className={"legendItem-content"}
    //             id={`legendTable-${this.state["Transportation Improvement Projects"].short}`}
    //           />
    //           {this.state['Transportation Improvement Projects'].classifications.forEach((key,index)=>{
    //               let rowStyle = {
    //                   width: '25px',
    //                   backgroundColor: key[1]
    //               }
    //             return (
    //                 <tr id={`tipLegend-tr${index}`}>
    //                     <td style={rowStyle}></td>
    //                     <td>{key[0]}</td>
    //                 </tr>
    //             )  })}
    //         </div>
    //     )
    //   }
    if (contentContainer != null && contentContainer.childElementCount == 0) {
      shit.classifications.map((key, index) => {
        let row = document.createElement("tr");
        let classColor = document.createElement("TD");
        classColor.style = `width: 25px; background-color: ${
          shit.classifications[index][1]
        }`;
        let className = document.createElement("TD");
        className.innerText = shit.classifications[index][0];
        row.innerHTML = classColor.outerHTML + className.outerHTML;
        contentContainer.appendChild(row);
      });
    }
  };

  render() {
    const layer = this.state[this.props.data];
    if (layer) {
      let legendContent = this.LegendBuilder(layer);
      return (
        <div
          className={"legendItem-container"}
          id={`legendItem-${layer.short}`}
        >
          <h2 className={"legendItem-title"}>{this.props.data}</h2>
          <h4 className={"legendItem-subtitle"}>{layer.sub}</h4>
          <table
            className={"legendItem-content"}
            id={`legendTable-${layer.short}`}
          />
        </div>
      );
    }
  }
}

export default withRouter(Legend);
