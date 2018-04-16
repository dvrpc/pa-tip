import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import { colors } from "../../utils/tileGeometryColorType.js";
import "./Expanded.css";
import Navbar from "../navbar/Navbar.js";
import submitComment from "../reducers/commentsReducer.js";
import { switchTabs } from "../../utils/switchTabs.js";

class Expanded extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colorScheme: {
        lightest: "white",
        middle: "grey",
        darkest: "black"
      }
    };
  }

  // use the category type from the full tip response to brand the page by category color scheme
  componentDidUpdate() {
    // TODO: error handling when going back to main page
    // why is this even being called when navigating away? is it the act of clicking on the back button..?
    const colorScheme = colors[this.props.details.category];
    if (this.state.colorScheme != colorScheme) this.setState({ colorScheme });
  }

  render() {
    const details = this.props.details;
    console.log("details are ", details);
    const colorScheme = this.state.colorScheme;
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
              className="left-column-padding"
              style={`background: ${colorScheme.darkest}`}
            >
              <em>
                <p onClick={this.props.history.goBack}> back to results </p>
              </em>
              <span class="divider">|</span>
              <a href="#comments-anchor">
                <em>
                  <p>comments</p>
                </em>
              </a>
              <span class="divider">|</span>
              <em>
                <p>print page</p>
              </em>
            </div>

            <figure>
              <div id="placeholder" />
            </figure>

            <h1 id="expanded-project-title" className="left-column-padding">
              {details ? details.road_name : "Project Title"}
            </h1>

            <p
              id="expanded-project-description"
              className="left-column-padding"
            >
              {details ? details.description : "Project Description"}
            </p>
          </section>
          <section className="right-column">
            <div className="tabs">
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

            {/*Funding table*/}
            <table
              id="Funding"
              className="funding-and-awards-table"
              ref={e => (this.funding = e)}
            >
              <thead>
                {/*primary header*/}
                <tr>
                  <td colspan="2" style={`background: ${colorScheme.middle}`} />
                  <td colspan="4" style={`background: ${colorScheme.darkest}`}>
                    <h3>TIP Program Years ($)</h3>
                  </td>
                  <td colspan="2" style={`background: ${colorScheme.middle}`} />
                </tr>
              </thead>
              <tbody style={`background: ${colorScheme.lightest}`}>
                {/*secondary header*/}
                <tr>
                  <td style={`background: ${colorScheme.middle}`}>
                    <a href="">Phase</a>
                  </td>
                  <td style={`background: ${colorScheme.middle}`}>
                    <a href="">Fund</a>
                  </td>
                  <td style={`background: ${colorScheme.darkest}`}>2018</td>
                  <td style={`background: ${colorScheme.darkest}`}>2019</td>
                  <td style={`background: ${colorScheme.darkest}`}>2020</td>
                  <td style={`background: ${colorScheme.darkest}`}>2021</td>
                  <td style={`background: ${colorScheme.middle}`}>2022-2025</td>
                  <td style={`background: ${colorScheme.middle}`}>2026-2029</td>
                </tr>
                {/*insert dynamic table information here: */}
                {details &&
                  details.funding.data.map(row => (
                    <tr className="table-data-rows">
                      <td>{row[0]}</td>
                      <td>{row[1]}</td>
                      <td>{row[2]}</td>
                      <td>{row[3]}</td>
                      <td>{row[4]}</td>
                      <td>{row[5]}</td>
                      <td>{row[6]}</td>
                      <td>{row[7]}</td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/*Awards table*/}
            <table
              id="Milestones"
              className="funding-and-awards-table hidden"
              ref={e => (this.milestones = e)}
            >
              <thead>
                {/*primary header*/}
                <th>
                  <td style={`background: ${colorScheme.darkest}`}>
                    <h3>PHS Type</h3>
                  </td>
                </th>
                <th>
                  <td style={`background: ${colorScheme.darkest}`}>
                    <h3>Milestone</h3>
                  </td>
                </th>
                <th>
                  <td style={`background: ${colorScheme.darkest}`}>
                    <h3>Estimated Date</h3>
                  </td>
                </th>
                <th>
                  <td style={`background: ${colorScheme.darkest}`}>
                    <h3>Actual Date</h3>
                  </td>
                </th>
              </thead>
              <tbody style={`background: ${colorScheme.lightest}`}>
                {/*insert dynamic table information here: */}
                {details &&
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
          </section>
        </div>
        <div className="comments" id="comments-anchor">
          <h1>Leave a Comment for This Project</h1>
          <form
            className="comments-form"
            onSubmit={linkEvent(this, submitComment)}
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
                style={`background: ${colorScheme.darkest}`}
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
    details: state.details
  };
};

const mapDispatchToProps = dispatch => {
  return {
    submitComment: comment => {
      dispatch(submitComment(comment));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expanded);
