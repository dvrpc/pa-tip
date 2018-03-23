import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import { colors } from "../../utils/tileGeometryColorType.js";
import "./Expanded.css";
import Navbar from "../navbar/Navbar.js";

// TODO BY EOD TODAY: get full tip from props
// use the category type from the full tip response to dynamically set the COLORS
class Expanded extends Component {
  constructor(props) {
    super(props);
    console.log("expanded props ", this.props);
    /* the values for the background colors will be replaced by props that correspond the project type*/
    this.state = {
      colorScheme: {
        lightest: "white",
        middle: "grey",
        darkest: "black"
      }
    };
  }

  componentDidUpdate() {
    const colorScheme = colors[this.props.details.category];
    if (this.state.colorScheme != colorScheme) this.setState({ colorScheme });
    console.log("state after colorscheme update ", this.state);
  }

  render() {
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
              Project Title
            </h1>

            <p
              id="expanded-project-description"
              className="left-column-padding"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              malesuada magna eget orci sodales sagittis. Suspendisse viverra
              purus at elit placerat imperdiet. Vestibulum mauris urna, gravida
              sit amet tincidunt eget, ullamcorper vitae risus. Morbi quam
              ligula, convallis et porta eget, hendrerit rutrum felis.
              Suspendisse potenti. Maecenas a pulvinar dolor. Aliquam sagittis
              augue augue, vel varius dolor accumsan non. Pellentesque luctus
              nisl sit amet justo porttitor, congue vehicula sem accumsan.
              Phasellus porta justo vitae sem maximus rhoncus. Vestibulum
              lacinia nibh eget erat venenatis sollicitudin. Maecenas ut enim
              vitae est tempor pellentesque. Aenean lectus leo, vestibulum id
              odio eu, viverra pharetra mi. Suspendisse non nisi sodales,
              laoreet urna et, vehicula nisi. In ut nisl urna. Sed nisi massa,
              sollicitudin id tellus at, iaculis consequat nisl. Etiam pharetra
              urna nec lacinia fringilla. Integer sed interdum tellus. Phasellus
              condimentum sit amet leo ut tempus. Nunc vestibulum sapien lacus,
              vel suscipit ex ultricies vel. Nulla sed posuere nunc. Praesent
              lorem tellus, cursus vel bibendum quis, convallis non justo. Nunc
              ligula mi, iaculis sed leo ut, placerat dapibus dolor.
              Pellentesque maximus odio in ligula sollicitudin ultricies. Etiam
              sit amet orci eget diam gravida molestie.
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
