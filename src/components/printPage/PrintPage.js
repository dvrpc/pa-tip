import Inferno, { Component } from "inferno";

import "./PrintPage.css";

class PrintPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("props at render ", this.props);
    return (
      <div className="print-page" style={this.props.show}>
        <h1>{this.props.details.road_name}</h1>

        <h2>MPMS ID: {this.props.details.id}</h2>

        <p>{this.props.details.description}</p>

        <table className="print-table">
          <thead>
            <tr>
              <td colspan="2" style={{ background: "#666" }} />
              <td colspan="4" style={{ background: "#333" }}>
                <h3>TIP Program Years ($000)</h3>
              </td>
              <td colspan="2" style={{ background: "#666" }} />
            </tr>
          </thead>

          <tbody>
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

            {this.props.details.funding.data.map(row => (
              <tr className="table-data-rows">
                <td>{row[0]}</td>

                <td>{row[1]}</td>

                <td style={{ fontWeight: "700" }}>{row[2]}</td>

                <td style={{ fontWeight: "700" }}>{row[3]}</td>

                <td style={{ fontWeight: "700" }}>{row[4]}</td>

                <td style={{ fontWeight: "700" }}>{row[5]}</td>

                <td>{row[6]}</td>

                <td>{row[7]}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="print-table">
          <thead>
            <tr>
              <th style={{ background: "#333" }}>PHS Type</th>

              <th style={{ background: "#333" }}>Milestone</th>

              <th style={{ background: "#333" }}>Estimated Date</th>

              <th style={{ background: "#333" }}>Actual Date</th>
            </tr>
          </thead>

          <tbody>
            {this.props.details.milestones.data.map(row => (
              <tr>
                <td>{row[0]}</td>
                <td>{row[1]}</td>
                <td>{row[2]}</td>
                <td>{row[3]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default PrintPage;
