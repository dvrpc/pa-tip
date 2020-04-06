import React, { Component } from "react";
import { connect } from "react-redux";

import "./Expanded.css";
import Navbar from "../navbar/Navbar.js";
import PrintPage from "../printPage/PrintPage.js";
import ReadOnlyComments from "../comments/ReadOnlyComments.js";

import { getFullTIP, hydrateGeometry } from "../reducers/getTIPInfo";
import { getSpecificComment } from "../reducers/commentsReducer";

import { colors } from "../../utils/tileGeometryColorType.js";
import { switchTabs } from "./switchTabs.js";
import { getTotals } from "./calculateFundingTotals.js";
import { programLookup } from "./programLookup.js";
import cat from "./cat.gif";
import noStreetview from "./noStreetview.jpg";

class Expanded extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: this.props.match.params.id
    };

    this.timeoutID = null;
  }

  backToResults = () => this.props.history.goBack();

  generateStreetview = geom => {
    this.streetview = new window.google.maps.StreetViewPanorama(
      this.streetview,
      {
        position: {
          lat: geom[1],
          lng: geom[0]
        },
        zoom: 0
      }
    );
  };

  componentDidMount() {
    this.props.hydrateGeometry(this.state.params);
    this.props.getFullTIP(this.state.params);
    this.props.getComments(this.state.params);
  }

  componentDidUpdate(prevProps) {
    const oldGeom = prevProps.geometry;
    const newGeom = this.props.geometry;

    // generate streetview if the project has geometry
    if (newGeom && newGeom.features.length) {
      const newCoords = newGeom.features[0].geometry.coordinates;
      if (!oldGeom) {
        this.generateStreetview(newCoords);
      } else {
        const oldCoords = oldGeom.features[0].geometry.coordinates;
        if (newCoords[0] !== oldCoords[0]) {
          this.generateStreetview(newCoords);
        }
      }
    }
  }

  // clear old project data (and timeout, if necessary) from the store to prevent expanded.js from pulling old information while fetching a new page
  componentWillUnmount() {
    this.props.hydrateGeometry(null);
    this.props.getFullTIP(null);
    if (this.timeoutID) window.clearTimeout(this.timeoutID);
  }

  render() {
    let details;
    let colorScheme;
    let navBackground = {};
    let toReturn;
    let funding;
    let loaded = false;
    let program;

    if (this.props.details) {
      // handle fetching errors
      if (this.props.details.error) {
        const reason = this.props.details.reason;

        const throwError = () => {
          alert(
            `Sorry! Project #${this.state.params} could not be fetched at this time due to ${reason}. Click 'ok' to return to the map.`
          );
          this.props.history.push("/keyword/tip");
        };

        // throw the error alert after 1.2 seconds of delay because immediate feedback from errors is bad ux
        this.timeoutID = window.setTimeout(throwError, 1200);

        // extract project information from store props
      } else {
        details = this.props.details;
        funding = getTotals(details.funding.data);
        program = programLookup(details.plan, details.mpo_finan);
        colorScheme = colors[details.category] || colors["Default"];
        navBackground = {
          background: `linear-gradient(to right, white 35%, ${colorScheme.middle} 65%, ${colorScheme.darkest})`
        };
        loaded = true;
      }
    }

    loaded
      ? (toReturn = (
          <div>
            <PrintPage
              details={details}
              totals={funding}
              program={program}
              id="print-mount"
            />
            <div className="expanded" id="react-no-print">
              <Navbar backgroundGradient={navBackground} id="expandedNav" />
              <div className="wrapper">
                <section className="left-column">
                  <div
                    id="content-mini-nav"
                    style={{ background: colorScheme.darkest }}
                  >
                    <p onClick={this.backToResults}>
                      <em>back</em>
                    </p>
                    <p onClick={window.print}>
                      <em>print</em>
                    </p>
                  </div>

                  <figure>
                    <div
                      id="placeholder"
                      ref={x => (this.streetview = x)}
                      style={{
                        background: `url(${noStreetview})`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center"
                      }}
                    />
                  </figure>

                  <h2
                    id="expanded-project-title"
                    className="left-column-padding"
                  >
                    {details.id
                      ? "DB #" + details.id + ": " + details.road_name
                      : "Project Title"}
                  </h2>

                  <div
                    id="expanded-project-description"
                    className="left-column-padding"
                  >
                    <p>
                      {details.description
                        ? details.description
                        : "Project Description"}
                    </p>
                    <hr />
                    {details.limits && (
                      <p>
                        <strong>Limits:</strong> {details.limits}
                      </p>
                    )}
                    {details.municipalities && (
                      <p>
                        <strong>Municipality(s)</strong>:{" "}
                        {details.municipalities}
                      </p>
                    )}
                    {details.county && (
                      <p>
                        <strong>County(s)</strong>: {details.county}
                      </p>
                    )}
                    {details.aq_code && (
                      <p>
                        <strong>Air Quality Code</strong>: {details.aq_code}
                      </p>
                    )}
                    {program && (
                      <p>
                        <strong>Program:</strong> {program}
                      </p>
                    )}
                  </div>
                </section>
                <section className="right-column">
                  <div
                    className="tabs"
                    style={{ background: colorScheme.darkest }}
                  >
                    <button
                      className="tablinks active"
                      onClick={e => switchTabs(this, e)}
                      ref={e => (this.fundingButton = e)}
                    >
                      Funding
                    </button>
                    <button
                      className="tablinks"
                      onClick={e => switchTabs(this, e)}
                      ref={e => (this.milestonesButton = e)}
                    >
                      Status
                    </button>
                  </div>

                  <div
                    id="Funding"
                    className="table-wrapper"
                    ref={e => (this.funding = e)}
                  >
                    {details.funding.data.length ? (
                      <table className="funding-and-awards-table">
                        <thead>
                          <tr>
                            <td colSpan={3} style={{ background: "#666" }} />
                            <td colSpan={4} style={{ background: "#333" }}>
                              <h3>NJ FY2020 TIP Program Years (in Millions)</h3>
                            </td>
                            <td colSpan={1} style={{ background: "#666" }} />
                          </tr>
                        </thead>
                        <tbody style={{ background: colorScheme.lightest }}>
                          <tr id="funding-subheaders">
                            <td colSpan={2} style={{ background: "#666" }}>
                              <a href="/TIP/NJ/pdf/CodesAbbrev.pdf">Phase</a>
                            </td>
                            <td style={{ background: "#666" }}>
                              <a href="/TIP/NJ/pdf/CodesAbbrev.pdf">Fund</a>
                            </td>
                            <td style={{ background: "#333" }}>FY20</td>
                            <td style={{ background: "#333" }}>FY21</td>
                            <td style={{ background: "#333" }}>FY22</td>
                            <td style={{ background: "#333" }}>FY23</td>
                            <td style={{ background: "#666" }}>FY24-29</td>
                          </tr>
                          {details.funding &&
                            details.funding.data.map(row => (
                              <tr
                                className="table-data-rows"
                                key={row[0] + row[1]}
                              >
                                <td colSpan={2}>{row[0]}</td>
                                <td>{row[1]}</td>
                                <td
                                  style={{
                                    background: colorScheme.middle,
                                    fontWeight: "700"
                                  }}
                                >
                                  ${row[2]}
                                </td>
                                <td
                                  style={{
                                    background: colorScheme.middle,
                                    fontWeight: "700"
                                  }}
                                >
                                  ${row[3]}
                                </td>
                                <td
                                  style={{
                                    background: colorScheme.middle,
                                    fontWeight: "700"
                                  }}
                                >
                                  ${row[4]}
                                </td>
                                <td
                                  style={{
                                    background: colorScheme.middle,
                                    fontWeight: "700"
                                  }}
                                >
                                  ${row[5]}
                                </td>
                                <td>${row[6]}</td>
                              </tr>
                            ))}
                          <tr id="program-year-totals">
                            <td
                              colSpan={3}
                              style={{ fontWeight: "700", color: "#333" }}
                            >
                              Program Year Totals (in Millions):
                            </td>
                            <td
                              style={{
                                background: colorScheme.darkest,
                                fontWeight: "700"
                              }}
                            >
                              ${funding[0]}
                            </td>
                            <td
                              style={{
                                background: colorScheme.darkest,
                                fontWeight: "700"
                              }}
                            >
                              ${funding[1]}
                            </td>
                            <td
                              style={{
                                background: colorScheme.darkest,
                                fontWeight: "700"
                              }}
                            >
                              ${funding[2]}
                            </td>
                            <td
                              style={{
                                background: colorScheme.darkest,
                                fontWeight: "700"
                              }}
                            >
                              ${funding[3]}
                            </td>
                            <td />
                          </tr>
                          <tr
                            style={{ background: "#666" }}
                            id="funding-totals"
                          >
                            <td colSpan={2}>
                              Total FY20-23 Cost (in Millions):
                            </td>
                            <td style={{ fontWeight: "700" }}>${funding[4]}</td>
                            <td colSpan={2}>
                              Total FY20-29 Cost (in Millions):
                            </td>
                            <td style={{ fontWeight: "700" }}>${funding[5]}</td>
                          </tr>
                        </tbody>
                      </table>
                    ) : (
                      <h3 id="noFunding">
                        This project is in the Study and Development Program,
                        which could become a candidate for consideration in a
                        future TIP and STIP Update for the phases of Preliminary
                        Engineering, Final Design, Right-of-Way Acquisition, and
                        Construction.
                      </h3>
                    )}
                  </div>

                  <div
                    id="Milestones"
                    className="table-wrapper hidden"
                    ref={e => (this.milestones = e)}
                  >
                    {details.milestones.data.length ? (
                      <table className="funding-and-awards-table">
                        <thead>
                          <tr>
                            <th style={{ background: "#333" }}>Milestone</th>

                            <th style={{ background: "#333" }}>
                              Estimated Date
                            </th>

                            <th style={{ background: "#333" }}>Actual Date</th>
                          </tr>
                        </thead>
                        <tbody style={{ background: colorScheme.lightest }}>
                          {details.milestones.data.map(row => (
                            <tr className="table-data-rows" key={row.join()}>
                              <td>{row[0]}</td>
                              <td>{row[1]}</td>
                              <td>{row[2]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <h3 id="noMilestones">
                        No milestones are available for this project.
                      </h3>
                    )}
                  </div>
                </section>
              </div>
            </div>
            <ReadOnlyComments
              colorScheme={colorScheme}
              comments={details.comments || []}
              title={"Comments and Responses"}
            />
          </div>
        ))
      : (toReturn = (
          <div id="loadingBackground">
            <Navbar
              backgroundGradient={`background: linear-gradient(to right, white 35%, grey 65%, black)`}
            />
            <img id="loadingExpanded" src={cat} alt="loading gif" />
            <h2>Loading...</h2>
          </div>
        ));

    return toReturn;
  }
}

const mapStateToProps = state => {
  return {
    details: state.getTIP.details,
    geometry: state.getTIP.geometry,
    comments: state.getComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id)),
    hydrateGeometry: id => dispatch(hydrateGeometry(id)),
    getComments: id => dispatch(getSpecificComment(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expanded);
