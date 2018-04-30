import Inferno, { Component } from "inferno";
import "./Footer.css";

class Footer extends Component {
  //TODO: add props, lifecycle hooks, other stuff
  render() {
    return (
      <footer className="footer">
        <div>
          <p>
            190 N. Independence Mall West, 8th Floor,
            <br />Philadelphia, PA 19106-1520
            <br />215.592.1800
            <br />© Delaware Valley Regional Planning Commission
          </p>
        </div>
        <div>
          <p>
            <a href="">Sign up for our email lists</a>
          </p>
          <p>
            <a href="/Policies/">Policies</a>
          </p>
        </div>
      </footer>
    );
  }
}

export default Footer;
