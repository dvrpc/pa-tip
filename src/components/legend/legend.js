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
        short: "LU",
        sub: "DVRPC (2015)"
      }
    };
  }
  // listen to see if layer is turned on, and if show make sure that the legend is visible
  LinkListener = event => {
    let target = event.target;
    if (target.classList.contains("selected")) {
      Object.keys(this.state).forEach(key => {
        if (target.innerText == key) {
          let links = document.querySelectorAll(".legendItem-container");
          links.forEach(link => {
            // console.log({link})
            link.id == `legendItem-${this.state[key].short}`
              ? link.classList.add("show")
              : link.classList.remove("show");
          });
        }
      });
    }
  };
  // @TODO: Refactor this jawn. It's working, but this is a sizeable chunk of code that can be made more efficient.
  LegendBuilder = layer => {
    let contentContainer = document.querySelector(
      `#legendTable-${layer.short}`
    );
    /*let tipContainer = document.querySelector("#legendTable-TIP");
    if (tipContainer == null) {
      console.log('tip does not exist')
      let legendContainer = document.querySelector(".legend-content");
      if (legendContainer != null) {
        let tipContainer = document.createElement("div");
        tipContainer.className = "legendItem-container";
        tipContainer.id = "legendItem-TIP";
        let tipLegendInfo = `<h2 class="legendItem-title">Transportation Improvement Projects</h2><h4 class="legendItem-subtitle">${
          this.state["Transportation Improvement Projects"].sub
          }</h4>`;
        tipContainer.innerHTML = tipLegendInfo;
        legendContainer.appendChild(tipContainer);
        let tipTable = document.createElement("table");
        this.state[
          "Transportation Improvement Projects"
        ].classifications.forEach((key, index) => {
          let legendAdd = `<tr id="tipLegend-tr${index}><td style="width: 25px; height: 25px; background-color: ${
            key[1]
            }"></td><td>${key[0]}</td></tr>`;
          tipTable.innerHTML += legendAdd;
        });
        tipContainer.appendChild(tipTable);
      }
    }
    else {}*/
    if (contentContainer != null && contentContainer.childElementCount == 0) {
      layer.classifications.map((key, index) => {
        let row = document.createElement("tr");
        let classColor = document.createElement("TD");
        classColor.style = `height: 25px; width: 25px; background-color: ${
          layer.classifications[index][1]
        }`;
        if (layer.short != "IPD") {
          let className = document.createElement("TD");
          className.innerText = layer.classifications[index][0];
          row.innerHTML = classColor.outerHTML + className.outerHTML;
        } else if (index == 0 || index == layer.classifications.length - 1) {
          index == 0
            ? (classColor.innerText = "0")
            : (classColor.innerText = "36");
          index == 0
            ? (classColor.style.color =
                layer.classifications[layer.classifications.length - 1][1])
            : (classColor.style.color = layer.classifications[0][1]);
          row.innerHTML = classColor.outerHTML;
        } else {
          row.innerHTML = classColor.outerHTML;
        }
        contentContainer.appendChild(row);
      });
    }
  };

  render() {
    document.addEventListener("click", e => {
      this.LinkListener(e);
    });
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
