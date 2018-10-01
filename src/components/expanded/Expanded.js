import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./Expanded.css";
import Navbar from "../navbar/Navbar.js";
import PrintPage from "../printPage/PrintPage.js";

import { getFullTIP, hydrateGeometry } from "../reducers/getTIPInfo";
import { colors } from "../../utils/tileGeometryColorType.js";
import { switchTabs } from "../../utils/switchTabs.js";
import { scrollToElement } from "../../utils/scrollToElement.js";
import { getTotals } from "../../utils/calculateFundingTotals.js";
import cat from "./cat.gif";
import noStreetview from "./noStreetview.jpg";

class Expanded extends Component {
  constructor(props) {
    super(props);
  }

  // @TODO: function that does more than just history.goBack()
  backToResults = () => {
    this.props.history.goBack();
  };

  componentWillMount() {
    this.props.getFullTIP(this.props.match.params.id);
    this.props.hydrateGeometry(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.geometryBackup !== this.props.geometryBackup) {
      // handle case of un-mapped keyword projects
      if (
        nextProps.geometryBackup.features &&
        nextProps.geometryBackup.features.length
      ) {
        window.streetview = new window.google.maps.StreetViewPanorama(
          this.streetview,
          {
            position: {
              lat: nextProps.geometryBackup.features[0].attributes.LATITUDE,
              lng: nextProps.geometryBackup.features[0].attributes.LONGITUDE
            },
            zoom: 0
          }
        );
      }
    }
  }

  componentDidMount() {
    if (this.props.geometryBackup) {
      if (
        this.props.geometryBackup.features &&
        this.props.geometryBackup.features.length
      ) {
        window.streetview = new window.google.maps.StreetViewPanorama(
          this.streetview,
          {
            position: {
              lat: this.props.geometryBackup.features[0].attributes.LATITUDE,
              lng: this.props.geometryBackup.features[0].attributes.LONGITUDE
            },
            zoom: 0
          }
        );
      }
    }
  }

  componentWillUnmount() {
    this.props.geometryBackup = {};
  }

  render() {
    let details;
    let colorScheme;
    let navBackground;
    let toReturn;
    let funding;
    this.props.details
      ? ((details = this.props.details),
        (funding = getTotals(this.props.details.funding.data)),
        (colorScheme = colors[details.category]),
        (navBackground = `background: linear-gradient(to right, white 35%, ${
          colorScheme.middle
        } 65%, ${colorScheme.darkest})`),
        (toReturn = (
          <div>
            <PrintPage details={details} totals={funding} id="print-mount" />
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
                      ? details.id + ": " + details.road_name
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
                    {details.limits && <div>{details.limits}</div>}
                    <p>
                      {details.municipalities && (
                        <span>{details.municipalities}, </span>
                      )}
                      {details.county && <span>{details.county} County</span>}
                    </p>
                    {details.aq_code && <p>AQ Code: {details.aq_code}</p>}
                  </div>
                </section>
                <section className="right-column">
                  <div
                    className="tabs"
                    style={{ background: colorScheme.darkest }}
                  >
                    <button
                      class="tablinks active"
                      onClick={linkEvent(this, switchTabs)}
                      ref={e => (this.fundingButton = e)}
                    >
                      Funding
                    </button>
                    <button
                      class="tablinks"
                      onClick={linkEvent(this, switchTabs)}
                      ref={e => (this.milestonesButton = e)}
                    >
                      Milestones
                    </button>
                  </div>

                  <div
                    id="Funding"
                    class="table-wrapper"
                    ref={e => (this.funding = e)}
                  >
                    <table className="funding-and-awards-table">
                      <thead>
                        <tr>
                          <td colspan="2" style={{ background: "#666" }} />
                          <td colspan="4" style={{ background: "#333" }}>
                            <h3>TIP Program Years ($000)</h3>
                          </td>
                          <td colspan="2" style={{ background: "#666" }} />
                        </tr>
                      </thead>
                      <tbody style={{ background: colorScheme.lightest }}>
                        <tr>
                          <td style={{ background: "#666" }}>
                            <a href="/TIP/Draft/pdf/CodesAbbrev.pdf">Phase</a>
                          </td>
                          <td style={{ background: "#666" }}>
                            <a href="/TIP/Draft/pdf/CodesAbbrev.pdf">Fund</a>
                          </td>
                          <td style={{ background: "#333" }}>2019</td>
                          <td style={{ background: "#333" }}>2020</td>
                          <td style={{ background: "#333" }}>2021</td>
                          <td style={{ background: "#333" }}>2022</td>
                          <td style={{ background: "#666" }}>2023-2026</td>
                          <td style={{ background: "#666" }}>2027-2030</td>
                        </tr>
                        {details.funding &&
                          details.funding.data.map(row => (
                            <tr className="table-data-rows">
                              <td>{row[0]}</td>
                              <td>{row[1]}</td>
                              <td
                                style={{
                                  background: colorScheme.middle,
                                  fontWeight: "700"
                                }}
                              >
                                {row[2]}
                              </td>
                              <td
                                style={{
                                  background: colorScheme.middle,
                                  fontWeight: "700"
                                }}
                              >
                                {row[3]}
                              </td>
                              <td
                                style={{
                                  background: colorScheme.middle,
                                  fontWeight: "700"
                                }}
                              >
                                {row[4]}
                              </td>
                              <td
                                style={{
                                  background: colorScheme.middle,
                                  fontWeight: "700"
                                }}
                              >
                                {row[5]}
                              </td>
                              <td>{row[6]}</td>
                              <td>{row[7]}</td>
                            </tr>
                          ))}
                        <tr>
                          <td
                            colspan="2"
                            style={{ fontWeight: "700", color: "#333" }}
                          >
                            Program Year Totals ($000):
                          </td>
                          <td
                            style={{
                              background: colorScheme.darkest,
                              fontWeight: "700"
                            }}
                          >
                            {funding[0]}
                          </td>
                          <td
                            style={{
                              background: colorScheme.darkest,
                              fontWeight: "700"
                            }}
                          >
                            {funding[1]}
                          </td>
                          <td
                            style={{
                              background: colorScheme.darkest,
                              fontWeight: "700"
                            }}
                          >
                            {funding[2]}
                          </td>
                          <td
                            style={{
                              background: colorScheme.darkest,
                              fontWeight: "700"
                            }}
                          >
                            {funding[3]}
                          </td>
                          <td />
                          <td />
                        </tr>
                        <tr style={{ background: "#666" }}>
                          <td colspan="3">Total FY2019 - 2022 Cost:</td>
                          <td style={{ fontWeight: "700" }}>{funding[4]}</td>
                          <td colspan="3">Total FY2019 - 2030 Cost:</td>
                          <td style={{ fontWeight: "700" }}>{funding[5]}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div
                    id="Milestones"
                    class="table-wrapper hidden"
                    ref={e => (this.milestones = e)}
                  >
                    <table className="funding-and-awards-table">
                      <thead>
                        <tr>
                          <th style={{ background: "#333" }}>Phase</th>

                          <th style={{ background: "#333" }}>Milestone</th>

                          <th style={{ background: "#333" }}>Estimated Date</th>

                          <th style={{ background: "#333" }}>Actual Date</th>
                        </tr>
                      </thead>
                      <tbody style={{ background: colorScheme.lightest }}>
                        {details.milestones &&
                          details.milestones.data.map(row => (
                            <tr className="table-data-rows">
                              <td>{row[0]}</td>
                              <td>{row[1]}</td>
                              <td>{row[2]}</td>
                              <td>{row[3]}</td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>
            </div>
          </div>
        )))
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
    test: state.getTIP.currentProject,
    geometryBackup: state.getTIP.geometry
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id)),
    hydrateGeometry: id => dispatch(hydrateGeometry(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expanded);
