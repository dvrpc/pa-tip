import React, { Component } from "react";
import { connect } from "react-redux";

import "./Project.css";
import PrintPage from "../printPage/PrintPage.js";
// @ADD back when commenting period is over
import Comments from "../comments/Comments.js";

import {
  getFullTIP,
  hydrateGeometry,
  setProjectScope,
  setActiveProject
} from "../../redux/reducers/getTIPInfo";
// import { getSpecificComment } from "../../redux/reducers/commentsReducer";

import { colors } from "../../utils/tileGeometryColorType.js";
import { groupProjects } from "../../utils/groupProjectsMPMS.js";
import { switchTabs } from "./switchTabs.js";
import { getTotals } from "./calculateFundingTotals.js";
import cat from "./cat.gif";
import noStreetview from "./noStreetview.png";

class Project extends Component {
  constructor(props) {
    super(props);

    this.state = {
      geom: false
    };

    this.timeoutID = null;
  }

  backToResults = () => {
    const hasHistory = this.props.history.length;
    if (hasHistory > 1) {
      this.props.history.goBack();
    }
  };

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
    // get project info
    const mpms = this.props.mpms;
    this.props.hydrateGeometry(mpms);
    this.props.getFullTIP(mpms);

    // set map filter
    this.props.setActiveProject(mpms);
  }

  componentDidUpdate() {
    const esriGeom = this.props.coords;

    // check for response
    if (!this.state.geom && esriGeom) {
      const coords = esriGeom.features.length
        ? esriGeom.features[0].geometry.coordinates
        : null;

      const id = parseInt(this.props.mpms);
      let groupProject = groupProjects.includes(id);

      // check for non empty response or group projects
      if (!groupProject || !coords) return;

      //this.generateStreetview(coords);
      this.setState({ geom: true });
    }
  }

  // clear old project data, geometry and timeout
  componentWillUnmount() {
    this.props.hydrateGeometry(null);
    this.props.getFullTIP(null);
    this.props.undoProjectScope();
    if (this.timeoutID) window.clearTimeout(this.timeoutID);

    // clear map filter
    this.props.setActiveProject(null);
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
            `Sorry! Project #${this.props.mpms} could not be fetched at this time due to ${reason}. Click 'ok' to return home.`
          );

          this.props.history.push("/");
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

            <div id="project" className="no-print">
              <div
                id="content-mini-nav"
                className="no-print"
                style={{ background: colorScheme.darkest }}
              >
                <p onClick={this.backToResults}>
                  <em>back</em>
                </p>
                <p onClick={window.print}>
                  <em>print</em>
                </p>
              </div>

              <figure className="no-print">
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
                  #{details.id} |{" "}
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

              <section id="project-table-section" className="project-content">
                <div className="tabs">
                  <button
                    className="tab-buttons active"
                    onClick={e => switchTabs(this, e)}
                    ref={e => (this.fundingButton = e)}
                  >
                    Funding
                  </button>
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
                          <h3>
                            Draft PA FY2021 TIP Program Years (in Millions)
                          </h3>
                        </th>
                        <th colSpan={1} />
                      </tr>
                    </thead>
                    <tbody
                      style={{
                        borderTop: `3px solid ${colorScheme.darkest}`,
                        borderBottom: `3px solid ${colorScheme.darkest}`
                      }}
                    >
                      <tr>
                        <td colSpan={1}>
                          <a
                            className="table-links"
                            href="/review/TIP/Draft/pdf/CodesAbbr.pdf"
                          >
                            Phase
                          </a>
                        </td>
                        <td>
                          <a
                            className="table-links"
                            href="/review/TIP/Draft/pdf/CodesAbbr.pdf"
                          >
                            Fund
                          </a>
                        </td>
                        <td style={{ fontWeight: "700" }}>FY21</td>
                        <td style={{ fontWeight: "700" }}>FY22</td>
                        <td style={{ fontWeight: "700" }}>FY23</td>
                        <td style={{ fontWeight: "700" }}>FY24</td>
                        <td>FY25-32</td>
                      </tr>
                      {details.funding &&
                        details.funding.data.map(row => (
                          <tr className="table-data-rows" key={row[0] + row[1]}>
                            <td colSpan={1}>{row[0]}</td>
                            <td>{row[1]}</td>
                            <td>${row[2]}</td>
                            <td>${row[3]}</td>
                            <td>${row[4]}</td>
                            <td>${row[5]}</td>
                            <td>${row[6]}</td>
                          </tr>
                        ))}
                      <tr>
                        <td colSpan={2}>Program Year Totals (in Millions):</td>
                        <td style={{ fontWeight: "700" }}>{funding[0]}</td>
                        <td style={{ fontWeight: "700" }}>{funding[1]}</td>
                        <td style={{ fontWeight: "700" }}>{funding[2]}</td>
                        <td style={{ fontWeight: "700" }}>{funding[3]}</td>
                        <td />
                      </tr>
                      <tr id="funding-totals" style={{ fontWeight: "700" }}>
                        <td colSpan={2}>Total FY21-24 Cost (in Millions):</td>
                        <td>{funding[4]}</td>
                        <td colSpan={2}>Total FY21-32 Cost (in Millions):</td>
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
                            <h3>Phase</h3>
                          </th>
                          <th>
                            <h3>Milestone</h3>
                          </th>
                          <th>
                            <h3>Estimated Date</h3>
                          </th>
                        </tr>
                      </thead>
                      <tbody
                        style={{
                          borderTop: `3px solid ${colorScheme.darkest}`,
                          borderBottom: `3px solid ${colorScheme.darkest}`
                        }}
                      >
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
            <Comments />
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
    coords: state.getTIP.geometry
    // comments: state.getComments
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id)),
    hydrateGeometry: id => dispatch(hydrateGeometry(id)),
    undoProjectScope: () => dispatch(setProjectScope(null)),
    setActiveProject: id => dispatch(setActiveProject(id))
    // getComments: id => dispatch(getSpecificComment(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
