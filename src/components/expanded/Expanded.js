import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./Expanded.css";
import Navbar from "../navbar/Navbar.js";

import { getFullTIP, hydrateGeometry } from "../reducers/getTIPInfo";
import { submitComment } from "../reducers/commentsReducer.js";
import { POSTComment } from "../../utils/POSTComment.js";
import { colors } from "../../utils/tileGeometryColorType.js";
import { switchTabs } from "../../utils/switchTabs.js";
import { scrollToElement } from "../../utils/scrollToElement.js";

class Expanded extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getFullTIP(this.props.match.params.id);
    // get geometry if expanded is being linked from an external source
    if (!this.props.info)
      this.props.hydrateGeometry(this.props.match.params.id);
  }

  componentWillReceiveProps(nextProps) {
    // hydrate geometry from a URL & only do it once
    if (!this.props.info && !window.streetview && this.props.geometryBackup) {
      window.streetview = new window.google.maps.StreetViewPanorama(
        this.streetview,
        {
          position: {
            lat: this.props.geometryBackup.features[0].attributes.LAG,
            lng: this.props.geometryBackup.features[0].attributes.LNG
          },
          zoom: 0
        }
      );
    }
  }

  componentDidMount() {
    if (this.props.info) {
      window.streetview = new window.google.maps.StreetViewPanorama(
        this.streetview,
        {
          position: {
            lat: this.props.info.attributes.LAG,
            lng: this.props.info.attributes.LNG
          },
          zoom: 0
        }
      );
    }
  }

  render() {
    const details = this.props.details;
    //Render runs multiple times until the data is completely pulled in
    //Message property means there was an error
    if (!details || "Message" in details) return;
    const colorScheme = details
      ? colors[details.category]
      : { lightest: "white", middle: "grey", darkest: "black" };

    const navBackground = `background: linear-gradient(to right, white 35%, ${
      colorScheme.lightest
    } 65%, ${colorScheme.middle})`;

    return (
      <div className="expanded">
        <Navbar backgroundGradient={navBackground} />
        <div className="wrapper">
          <section className="left-column">
            <div
              id="content-mini-nav"
              style={{ background: colorScheme.darkest }}
            >
              <p onClick={this.props.history.goBack}>
                <em>back to results</em>
              </p>

              <span class="divider">|</span>

              <a
                href="#comments-anchor"
                onClick={e => {
                  scrollToElement(this, e, "comments");
                }}
              >
                <p>
                  <em>comments</em>
                </p>
              </a>

              <span class="divider">|</span>

              <p>
                <em>print page</em>
              </p>
            </div>

            <figure>
              <div id="placeholder" ref={x => (this.streetview = x)} />
            </figure>

            <h1 id="expanded-project-title" className="left-column-padding">
              {details.id
                ? details.id + ": " + details.road_name
                : "Project Title"}
            </h1>

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
            <div className="tabs" style={{ background: colorScheme.darkest }}>
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
                      <h3>TIP Program Years ($)</h3>
                    </td>
                    <td colspan="2" style={{ background: "#666" }} />
                  </tr>
                </thead>
                <tbody style={{ background: colorScheme.lightest }}>
                  <tr>
                    <td style={{ background: "#666" }}>Phase</td>
                    <td style={{ background: "#666" }}>Fund</td>
                    <td style={{ background: "#333" }}>2018</td>
                    <td style={{ background: "#333" }}>2019</td>
                    <td style={{ background: "#333" }}>2020</td>
                    <td style={{ background: "#333" }}>2021</td>
                    <td style={{ background: "#666" }}>2022-2025</td>
                    <td style={{ background: "#666" }}>2026-2029</td>
                  </tr>
                  {details.funding &&
                    details.funding.data.map(row => (
                      <tr className="table-data-rows">
                        <td>{row[0]}</td>
                        <td>{row[1]}</td>
                        <td style={{ background: colorScheme.middle }}>
                          {row[2]}
                        </td>
                        <td style={{ background: colorScheme.middle }}>
                          {row[3]}
                        </td>
                        <td style={{ background: colorScheme.middle }}>
                          {row[4]}
                        </td>
                        <td style={{ background: colorScheme.middle }}>
                          {row[5]}
                        </td>
                        <td>{row[6]}</td>
                        <td>{row[7]}</td>
                      </tr>
                    ))}
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
                    <th style={{ background: "#333" }}>
                      <h3>PHS Type</h3>
                    </th>

                    <th style={{ background: "#333" }}>
                      <h3>Milestone</h3>
                    </th>

                    <th style={{ background: "#333" }}>
                      <h3>Estimated Date</h3>
                    </th>

                    <th style={{ background: "#333" }}>
                      <h3>Actual Date</h3>
                    </th>
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
        <div
          className="comments"
          id="comments-anchor"
          ref={el => {
            this.comments = el;
          }}
        >
          <h1>Leave a Comment for This Project</h1>
          <form
            className="comments-form"
            onSubmit={linkEvent(this, POSTComment)}
          >
            <textarea placeholder="Submit a comment for this project" />
            <div className="input-fields">
              <input
                className="comment-form-info"
                type="text"
                name="name"
                placeholder="name"
                required
              />
              <input
                className="comment-form-info"
                type="email"
                name="email"
                placeholder="email"
                required
              />
              <input
                className="comment-form-info"
                type="text"
                name="county"
                placeholder="county of residence"
                required
              />
              <input
                id="submitCommentButton"
                type="submit"
                value="submit"
                style={{ background: colorScheme.darkest }}
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    details: state.getTIP.details,
    info: state.getTIP.currentProject,
    geometryBackup: state.getTIP.geometry
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id)),
    submitComment: comment => dispatch(submitComment(comment)),
    hydrateGeometry: id => dispatch(hydrateGeometry(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expanded);
