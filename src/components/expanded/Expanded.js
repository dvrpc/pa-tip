import Inferno, { Component, linkEvent } from "inferno";

import "./Expanded.css";
import Navbar from "../navbar/Navbar.js";

class Expanded extends Component {
  constructor(props) {
    super(props);
    console.log("this props ", this.props);
    /* the values for the background colors will be replaced by props that correspond the project type*/
    this.state = {
      backgroundDarkest: { background: "#660066" },
      backgroundMiddle: "",
      backgroundLightest: ""
    };
  }

  render() {
    return (
      <div className="expanded">
        <Navbar />
        <div className="wrapper">
          <section className="left-column">
            <div
              id="content-mini-nav"
              className="left-column-padding"
              style={this.state.backgroundDarkest}
            >
              <h3> back to results </h3>
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
            <div className="tabs card">
              <table>
                <thead>
                  <th>Phase</th>
                  <th>Fund</th>
                  <th>Year</th>
                  <th>Other</th>
                </thead>
                <tbody>
                  <tr>
                    <td>CON</td>
                    <td>TOLL</td>
                    <td>2017</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>DRF</td>
                    <td>TAU</td>
                    <td>2021</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>EKL</td>
                    <td>NOP</td>
                    <td>2029</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>EKL</td>
                    <td>NOP</td>
                    <td>2029</td>
                    <td>test</td>
                  </tr>
                  <tr>
                    <td>EKL</td>
                    <td>NOP</td>
                    <td>2029</td>
                    <td>test</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="comments">
              <form className="comments-form">
                <textarea placeholder="Submit a comment for this project" />
                <input id="submitCommentButton" type="submit" value="submit" />
              </form>
            </div>
          </section>
        </div>
      </div>
    );
  }
}

export default Expanded;
