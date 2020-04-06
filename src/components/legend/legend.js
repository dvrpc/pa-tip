import React, { Component } from "react";
import "./legend.css";
import { layers } from "./layers.js";

class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "TIP"
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

    // call function to make active and deactivate the others (exclude edge case where users click the UL itself i.e. edges)
    if (legendItem) {
      this.toggleActiveLayer(e.target.parentNode, legendItem);

      // flip selected & set up the jawns
      this.setState({ selected: legendItem });
    }
  };

  render() {
    return (
      <div className={`legend-menu ${this.props.show}`}>
        <ul className="legend-links" onClick={this.updateLegendVisibility}>
          <li className="legendLink active" id="legendLink-TIP">
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
          <li className="legendLink" id="legendLink-Urban">
            Urbanized Areas
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
