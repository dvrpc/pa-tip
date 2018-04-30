import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import "./Homepage.css";
import { getTIPByKeywords, setMapCenter } from "../reducers/getTIPInfo";
import { search, generateAutocomplete } from "../../utils/search.js";
import { handleRadioChange } from "../../utils/handleRadioChange.js";
import { scrollToElement } from "../../utils/scrollToElement.js";

import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";
import arrow from "./arrow.png";
import philly from "./philly.mp4";
import firstFrame from "./firstFrame.jpg";

class Homepage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: "",
      selectedButton: "Place"
    };

    this.handleChange.bind(this);
  }

  componentDidMount() {
    generateAutocomplete(this.input, () => {
      this.handleChange({ target: { value: this.input.value } });
      search(this, new Event(null));
    });
  }

  handleChange = e => this.setState({ value: e.target.value });

  render() {
    return (
      <div className="homepage">
        <div className="landing">
          <div className="homepage-banner">
            <img id="banner-logo" src={logo} alt="dvrpc logo" />
            <img
              id="banner-tip-logo"
              src={TIP_logo}
              alt="Transportation Improvement Program logo"
            />
            <div className="stacked-headers">
              <h1>FY19 PA Transportation</h1>
              <h1>Improvement Program</h1>
            </div>
          </div>

          <div className="homepage-main">
            <video
              playsinline
              autoplay
              muted
              loop
              poster={firstFrame}
              id="bgvid"
            >
              <source src={philly} type="video/mp4" />
            </video>
            <form
              role="search"
              id="search-form"
              method="get"
              action={linkEvent(this, search)}
            >
              <div
                className="homepage-radio-group"
                ref={e => (this.radioGroup = e)}
              >
                <p> Search by: </p>
                <input
                  type="radio"
                  name="searchType"
                  id="Place"
                  value="Place"
                  checked={this.state.selectedButton === "Place"}
                  onChange={linkEvent(this, handleRadioChange)}
                />
                <label for="Place">Place</label>

                <input
                  type="radio"
                  name="searchType"
                  id="MPMS"
                  value="MPMS"
                  checked={this.state.selectedButton === "MPMS"}
                  onChange={linkEvent(this, handleRadioChange)}
                />
                <label for="MPMS">MPMS ID</label>

                <input
                  type="radio"
                  name="searchType"
                  id="Keyword"
                  value="Keyword"
                  checked={this.state.selectedButton === "Keyword"}
                  onChange={linkEvent(this, handleRadioChange)}
                />
                <label for="Keyword">Keyword</label>
              </div>

              <input
                id="homepage-search-bar"
                required
                type="text"
                placeholder="enter address, location, building, etc"
                value={this.state.value}
                onInput={this.handleChange}
                ref={i => {
                  this.input = i;
                }}
              />
            </form>
          </div>

          <div className="homepage-bottom-bar">
            <a
              href="#tip-info"
              onClick={e => {
                scrollToElement(this, e, "tipInfo");
              }}
            >
              <img src={arrow} alt="down navigation arrow" />
            </a>
          </div>
        </div>

        <div
          id="tip-info"
          ref={el => {
            this.tipInfo = el;
          }}
        >
          <div className="nav-links-box">
            <p> Long-Range Plan and TIP </p>
            <ul>
              <li>
                <a href="https://www.dvrpc.org/tip/">
                  Transportation Improvement Program (TIP)
                </a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/Products/17065/">TIP Guide</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/TIP/PA/">FY2017 TIP for PA</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/TIP/NJ/">FY2018 TIP for NJ</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/ProjectImplementation/">
                  Project Implementation
                </a>
              </li>
            </ul>
          </div>
          <div className="tip-info-cluster">
            <div className="tip-info-paragraphs">
              <h2>About DVRPC and the TIP</h2>
              <p>
                The Delaware Valley Regional Planning Commission is the
                federally designated Metropolitan Planning Organization for a
                diverse nine-county region in two states: Bucks, Chester,
                Delaware, Montgomery, and Philadelphia in Pennsylvania; and
                Burlington, Camden, Gloucester, and Mercer in New Jersey.
              </p>
              <p>
                <strong>DVRPC’s vision</strong> for the Greater Philadelphia
                Region is a prosperous, innovative, equitable, resilient, and
                sustainable region that increases mobility choices by investing
                in a safe and modern transportation system; that protects and
                preserves our natural resources while creating healthy
                communities; and that fosters greater opportunities for all.
              </p>
              <p>
                <strong>DVRPC’s mission</strong> is to achieve this vision by
                convening the widest array of partners to inform and facilitate
                data-driven decision-making. We are engaged across the region,
                and strive to be leaders and innovators, exploring new ideas and
                creating best practices.
              </p>
            </div>
          </div>

          <hr />

          <div className="tip-info-cluster">
            <div className="tip-info-paragraphs">
              <h2>How to Use this Application</h2>
              <p>
                The Delaware Valley Regional Planning Commission is the
                federally designated Metropolitan Planning Organization for a
                diverse nine-county region in two states: Bucks, Chester,
                Delaware, Montgomery, and Philadelphia in Pennsylvania; and
                Burlington, Camden, Gloucester, and Mercer in New Jersey. DVRPC
                fully complies with Title VI of the Civil Rights Act of 1964 and
                related nondiscrimination statutes in all activities. For more
                information, visit{" "}
                <a href="https://www.dvrpc.org/GetInvolved/TitleVI">
                  the DVRPC Title VI page
                </a>. The authors are solely responsible for the findings and
                conclusions herein, which may not represent the official views
                or policies of the funding agencies.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getTIPByKeywords: keywords => {
      dispatch(getTIPByKeywords(keywords));
    },
    setMapCenter: latlng => {
      dispatch(setMapCenter(latlng));
    }
  };
};

export default withRouter(connect(null, mapDispatchToProps)(Homepage));
