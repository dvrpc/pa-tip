import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import { colors } from "../../utils/tileGeometryColorType.js";
import "./Expanded.css";
import Navbar from "../navbar/Navbar.js";

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
    console.log("expanded props on update ", this.props);
    // TODO: error handling when going back to main page
    const colorScheme = colors[this.props.details.category];
    if (this.state.colorScheme != colorScheme) this.setState({ colorScheme });
  }

  render() {
    const details = this.props.details;
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
                <h3 onClick={this.props.history.goBack}> back to results </h3>
              </em>
              <em>
                <h3>print page</h3>
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
            <table id="funding-and-awards-table">
              <thead style={`background: ${colorScheme.middle}`}>
                <th>
                  <h3>Phase</h3>
                </th>
                <th>
                  <h3>Fund</h3>
                </th>
                <th>
                  <h3>Year</h3>
                </th>
                <th>
                  <h3>Other</h3>
                </th>
              </thead>
              <tbody style={`background: ${colorScheme.lightest}`}>
                <tr>
                  <td>Phase 3</td>
                  <td>TOLL</td>
                  <td>2017</td>
                  <td>test</td>
                </tr>
                <tr>
                  <td>Phase 10</td>
                  <td>TAU</td>
                  <td>2021</td>
                  <td>test</td>
                </tr>
                <tr>
                  <td>Phase 6</td>
                  <td>NOP</td>
                  <td>2029</td>
                  <td>test</td>
                </tr>
                <tr>
                  <td>Phase 8</td>
                  <td>NOP</td>
                  <td>2029</td>
                  <td>test</td>
                </tr>
                <tr>
                  <td>Phase 1</td>
                  <td>NOP</td>
                  <td>2029</td>
                  <td>test</td>
                </tr>
              </tbody>
            </table>
            <div className="comments">
              <form className="comments-form">
                <textarea placeholder="Submit a comment for this project" />
                <input
                  id="submitCommentButton"
                  type="submit"
                  value="submit"
                  style={`background: ${colorScheme.darkest}`}
                />
              </form>
            </div>
          </section>
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

export default connect(mapStateToProps, null)(Expanded);
