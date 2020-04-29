import React, { Component } from "react";
import { connect } from "react-redux";

import "./Project.css";
import PrintPage from "../printPage/PrintPage.js";
// @ADD back when commenting period is over
//import ReadOnlyComments from "../comments/ReadOnlyComments.js";

import { getFullTIP, hydrateGeometry } from "../../redux/reducers/getTIPInfo";
// import { getSpecificComment } from "../../redux/reducers/commentsReducer";

import { colors } from "../../utils/tileGeometryColorType.js";
import { switchTabs } from "./switchTabs.js";
import { getTotals } from "./calculateFundingTotals.js";
import cat from "./cat.gif";
import noStreetview from "./noStreetview.jpg";

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      //params: this.props.match.params.id
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

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    const mpms = this.props.mpms;

    // this.props.getComments(mpms);
    this.props.getFullTIP(mpms);

    // coinstar
    // this.props.hydrateGeometry(mpms);

    // const oldGeom = prevProps.geometry;
    // const newGeom = this.props.geometry;

    // // generate streetview if the project has geometry
    // if (newGeom && newGeom.features.length) {
    //   const newCoords = newGeom.features[0].geometry.coordinates;
    //   if (!oldGeom) {
    //     this.generateStreetview(newCoords);
    //   } else {
    //     const oldCoords = oldGeom.features[0].geometry.coordinates;
    //     if (newCoords[0] !== oldCoords[0]) {
    //       this.generateStreetview(newCoords);
    //     }
    //   }
    // }
  }

  // clear old project data (and timeout, if necessary) from the store to prevent Project.js from pulling old information while fetching a new page
  componentWillUnmount() {
    this.props.hydrateGeometry(null);
    this.props.getFullTIP(null);
    if (this.timeoutID) window.clearTimeout(this.timeoutID);
  }

  render() {
    let details;
    let colorScheme;
    let toReturn;
    let funding;
    let loaded = false;

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
        colorScheme = colors[details.category] || colors["Default"];
        loaded = true;
      }
    }

    loaded
      ? (toReturn = (
          <div>
            <PrintPage details={details} totals={funding} id="print-mount" />

            <div id="project">
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
                    backgroundImage: `url(${noStreetview})`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center"
                  }}
                />
              </figure>

              <section className="project-content-section">
                <h2 id="project-title">
                  {details.road_name ? details.road_name : "Project Title"}
                </h2>

                <div id="project-description" className="project-content">
                  <p>
                    {details.description
                      ? details.description
                      : "project Description"}
                  </p>
                  {details.id && (
                    <p>
                      <strong>MPMS: </strong> {details.id}
                    </p>
                  )}
                  {details.limits && (
                    <p>
                      <strong>Limits:</strong> {details.limits}
                    </p>
                  )}
                  {details.municipalities && (
                    <p>
                      <strong>Municipality(s)</strong>: {details.municipalities}
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
                </div>
              </section>

              <hr id="project-hr" />

              <section className="project-content">
                <div className="tabs">
                  <button
                    className="tab-buttons active"
                    onClick={e => switchTabs(this, e)}
                    ref={e => (this.fundingButton = e)}
                  >
                    Funding
                  </button>
                  <span
                    className="vr"
                    style={{ border: `1px dotted ${colorScheme.darkest}` }}
                  ></span>
                  <button
                    className="tab-buttons"
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
                  <table className="funding-and-awards-table">
                    <thead>
                      <tr>
                        <th colSpan={2} />
                        <th colSpan={4}>
                          <h3>PA FY2020 TIP Program Years (in Millions)</h3>
                        </th>
                        <th colSpan={1} />
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td colSpan={1}>
                          {/* @UPDATE: find equivalent PA TIP pdf */}
                          <a
                            className="table-links"
                            href="/TIP/PA/pdf/CodesAbbrev.pdf"
                          >
                            Phase
                          </a>
                        </td>
                        <td>
                          {/* @UPDATE: find equivalent PA TIP pdf */}
                          <a
                            className="table-links"
                            href="/TIP/PA/pdf/CodesAbbrev.pdf"
                          >
                            Fund
                          </a>
                        </td>
                        <td style={{ background: colorScheme.darkest }}>
                          FY20
                        </td>
                        <td style={{ background: colorScheme.darkest }}>
                          FY21
                        </td>
                        <td style={{ background: colorScheme.darkest }}>
                          FY22
                        </td>
                        <td style={{ background: colorScheme.darkest }}>
                          FY23
                        </td>
                        <td>FY24-29</td>
                      </tr>
                      {details.funding &&
                        details.funding.data.map(row => (
                          <tr className="table-data-rows" key={row[0] + row[1]}>
                            <td colSpan={1}>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td style={{ background: colorScheme.middle }}>
                              ${row[2]}
                            </td>
                            <td style={{ background: colorScheme.middle }}>
                              ${row[3]}
                            </td>
                            <td style={{ background: colorScheme.middle }}>
                              ${row[4]}
                            </td>
                            <td style={{ background: colorScheme.middle }}>
                              ${row[5]}
                            </td>
                            <td>${row[6]}</td>
                          </tr>
                        ))}
                      <tr>
                        <td colSpan={2}>Program Year Totals (in Millions):</td>
                        <td
                          style={{
                            background: colorScheme.middle,
                            fontWeight: "700"
                          }}
                        >
                          {funding[0]}
                        </td>
                        <td
                          style={{
                            background: colorScheme.middle,
                            fontWeight: "700"
                          }}
                        >
                          {funding[1]}
                        </td>
                        <td
                          style={{
                            background: colorScheme.middle,
                            fontWeight: "700"
                          }}
                        >
                          {funding[2]}
                        </td>
                        <td
                          style={{
                            background: colorScheme.middle,
                            fontWeight: "700"
                          }}
                        >
                          {funding[3]}
                        </td>
                        <td />
                      </tr>
                      <tr
                        style={{
                          fontWeight: "700"
                        }}
                        id="funding-totals"
                      >
                        <td colSpan={2}>Total FY20-23 Cost (in Millions):</td>
                        <td>{funding[4]}</td>
                        <td colSpan={2}>Total FY20-29 Cost (in Millions):</td>
                        <td>{funding[5]}</td>
                      </tr>
                    </tbody>
                  </table>
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
                          <th>
                            <h3>Milestone</h3>
                          </th>
                          <th>
                            <h3>Estimated Date</h3>
                          </th>
                          <th>
                            <h3>Actual Date</h3>
                          </th>
                        </tr>
                      </thead>
                      <tbody>
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
            {/* <ReadOnlyComments
              colorScheme={colorScheme}
              comments={details.comments || []}
              title={"Comments and Responses"}
            /> */}
          </div>
        ))
      : (toReturn = (
          <div id="loadingBackground">
            <img id="loadingProject" src={cat} alt="loading gif" />
            <h2>Loading...</h2>
          </div>
        ));

    return toReturn;
  }
}

const mapStateToProps = state => {
  return {
    details: state.getTIP.details,
    geometry: state.getTIP.geometry
    // comments: state.getComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id)),
    hydrateGeometry: id => dispatch(hydrateGeometry(id))
    // getComments: id => dispatch(getSpecificComment(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);