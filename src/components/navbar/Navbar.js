import Inferno, { Component } from "inferno";
import "./Navbar.css";
import dvrpclogo from "./dvrpclogo.png";

class Navbar extends Component {
  render() {
    return (
      <nav className="navBar">
        <a href="/">
          <img src={dvrpclogo} alt="logo" />
        </a>
        <h2>FY2018 PA TIP</h2>
        <form>
          <input type="textarea" placeholder="Enter Address" />
          <select name="funds">
            <option value="" selected>
              Fund
            </option>
            <option value="1">A FUND</option>
            <option value="2">ANOTHER FUND</option>
            <option value="3">3RD FUND</option>
          </select>
          <select name="category">
            <option value="" selected>
              Category
            </option>
            <option value="1">A CATEGORY</option>
            <option value="2">ANOTHER CATEGORY</option>
            <option value="3">3RD CATEGORY</option>
          </select>
          <input type="button" value="search" />
        </form>
      </nav>
    );
  }
}

export default Navbar;
