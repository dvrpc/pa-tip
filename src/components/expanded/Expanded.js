import Inferno, { Component, linkEvent } from "inferno";

import "./Expanded.css";
import Navbar from "../navbar/Navbar.js";
// GOAL: a printable, shareable view of the modal which includes all the information in the modal + the data tables
// To populate: Pass the entire response object as props from modal to Expanded.js and go from there
// include the dispatcher to the comments database for people that want to submit comments.
// needs to connect to redux ONLY to dispatch the comment (information will be passed directly from parent component...should it come from redux store?)

// LAYOUT:
// navbar
// two column:
// column-left: title and description
// column-right: two rows
// top row: tab component displaying either the funds data table or the milestone data table
// bottom row: make and/or view comments

class Expanded extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="expanded">
        <Navbar />
        <div className="wrapper">
          <section className="left-column">
            <h1>Project Title</h1>
            <div className="project-details">
              <h4>Delaware County</h4>
              <h4>Bicycle/Pedestrian Improvement</h4>
              <h4>AQ Code: 20302</h4>
            </div>
            <p>
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
              <h1> Data tables Go Here </h1>
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
            <div className="comments card">
              <h1> Comments Widget Goes Here </h1>
              <form className="commentsForm">
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
