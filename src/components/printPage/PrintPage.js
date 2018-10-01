import Inferno, { Component } from "inferno";
import PrintTemplate from "react-print";

const printMain = {
  position: "absolute",
  height: "100%",
  top: "1%",
  padding: "2% 3%",
  color: "#333"
};
const printTable = {
  width: "100%",
  padding: "2% 0",
  textAlign: "center"
};
const printSubheadersWrap = {
  padding: "2% 0",
  display: "flex",
  justifyContent: "space-around",
  alignContent: "center"
};
const header = {
  fontSize: "1.3rem",
  textAlign: "center"
};
const subHeaders = {
  fontSize: "1rem",
  textAlign: "left",
  paddingTop: "5%",
  borderBottom: "1px solid black"
};

class PrintPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <PrintTemplate style={printMain}>
        <h1 style={header}>{this.props.details.road_name}</h1>

        <div style={printSubheadersWrap}>
          <h2 style={{ fontSize: "1rem" }}>MPMS ID: {this.props.details.id}</h2>

          <h2 style={{ fontSize: "1rem" }}>{this.props.details.county}</h2>

          <h2 style={{ fontSize: "1rem" }}>
            AQ Code: {this.props.details.aq_code}
          </h2>
        </div>

        <p style={{ paddingTop: "2%" }}>{this.props.details.description}</p>

        <h1 style={subHeaders}>Project Funding:</h1>
        <table style={printTable}>
          <thead>
            <tr>
              <td colspan="2" />
              <td
                colspan="4"
                style={{ fontWeight: "700", textAlign: "center" }}
              >
                TIP Program Years ($000)
              </td>
              <td colspan="2" />
            </tr>
          </thead>

          <tbody>
            <tr style={{ color: "#f7f7f7" }}>
              <td>
                <a href="/TIP/Draft/pdf/CodesAbbrev.pdf">Phase</a>
              </td>
              <td>
                <a href="/TIP/Draft/pdf/CodesAbbrev.pdf">Fund</a>
              </td>
              <td style={{ fontWeight: "700" }}>2019</td>
              <td style={{ fontWeight: "700" }}>2020</td>
              <td style={{ fontWeight: "700" }}>2021</td>
              <td style={{ fontWeight: "700" }}>2022</td>
              <td>2023-2026</td>
              <td>2027-2030</td>
            </tr>

            {this.props.details.funding.data.map(row => (
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
            <tr>
              <td colspan="2" style={{ fontWeight: "700", color: "#333" }}>
                Program Year Totals ($000):
              </td>
              <td style={{ fontWeight: "700" }}>{this.props.totals[0]}</td>
              <td style={{ fontWeight: "700" }}>{this.props.totals[1]}</td>
              <td style={{ fontWeight: "700" }}>{this.props.totals[2]}</td>
              <td style={{ fontWeight: "700" }}>{this.props.totals[3]}</td>
              <td />
              <td />
            </tr>
          </tbody>
        </table>

        <p style={{ marginLeft: "2%" }}>
          Total FY2019 - 2022 Cost: <strong>{this.props.totals[4]}</strong>
        </p>

        <p style={{ marginLeft: "2%" }}>
          Total FY2019 - 2030 Cost: <strong>{this.props.totals[5]}</strong>
        </p>

        <h1 style={subHeaders}>Project Milestones:</h1>
        <table style={printTable}>
          <thead>
            <tr>
              <th>PHS Type</th>

              <th>Milestone</th>

              <th>Estimated Date</th>

              <th>Actual Date</th>
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
      </PrintTemplate>
    );
  }
}

export default PrintPage;
