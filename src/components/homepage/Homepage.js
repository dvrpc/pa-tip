import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";
import { withRouter } from "inferno-router";

import "./Homepage.css";
import Comments from "../comments/Comments.js";
import Modal from "../modal/Modal.js";

import {
  getTIPByKeywords,
  setMapCenter,
  setMapState
} from "../reducers/getTIPInfo";
import { resetCommentBool } from "../reducers/commentsReducer.js";

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
      selectedButton: "Location"
    };

    this.handleChange.bind(this);
  }

  componentDidMount() {
    generateAutocomplete(this.input, () => {
      if (this.input) this.handleChange(this.state.value);
    });
  }

  handleChange = e => this.setState({ value: e });

  render() {
    console.log("state ", this.state);
    return (
      <div className="homepage">
        {this.props.commentResponse ? (
          <Modal resetCommentBool={this.props.resetCommentBool} />
        ) : null}
        <div className="landing">
          <div className="homepage-banner">
            <div id="banner-logo">
              <img src={logo} alt="dvrpc logo" />
            </div>
            <img
              id="banner-tip-logo"
              src={TIP_logo}
              alt="Transportation Improvement Program logo"
            />
            <div className="stacked-headers">
              <h1>Draft FY2019 Transportation Improvement</h1>
              <h1>Program for Pennsylvania (FY19-22)</h1>
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
              onSubmit={linkEvent(this, search)}
            >
              <div
                className="homepage-radio-group"
                ref={e => (this.radioGroup = e)}
              >
                <p> Search by: </p>
                <input
                  type="radio"
                  name="searchType"
                  id="Location"
                  value="Location"
                  checked={this.state.selectedButton === "Location"}
                  onChange={linkEvent(this, handleRadioChange)}
                />
                <label for="Location">Location</label>

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
              More Information
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
            <p>
              <a href="https://www.dvrpc.org/TIP/">
                Transportation Improvement Program (TIP)
              </a>
            </p>
            <ul>
              <li>
                <b>Draft FY2019 TIP for PA</b>
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
              <h2>
                Draft FY2019 Transportation Improvement Program for Pennsylvania
                (FY19-22)
              </h2>
              <p>
                DVRPC invites the public to review and comment on the Draft
                FY2019 TIP for the Pennsylvania counties in the DVRPC region.
                This TIP was developed in cooperation with PennDOT, SEPTA, PART
                and DVRPC's member counties and cities and represents the
                transportation priorities for the region. We have opened a
                comment period (ending 5:00 p.m. Eastern time on Sunday, June 3,
                2018) to allow the public an opportunity to comment on the Draft
                Program. In addition to the Draft TIP, DVRPC will be seeking
                public comment on the Draft Transportation Conformity Finding
                (Public Comment Period opens Thursday, May 10, 2018).
              </p>
              <p>
                DVRPC strongly encourages the public to submit comments on the
                Draft TIP by using the search and explore feature above.
              </p>
              <h2>Public Meeting</h2>
              <p>
                There will be a public meeting held at the following location
                for those who want to present their comments verbally on the
                Draft FY2019 TIP (note that comments must still be submitted in
                writing):
              </p>
              <p>
                Thursday, May 24, 2018
                <br />4:00 p.m.–6:00 p.m.
                <br />DVRPC Conference Room
                <br />190 N. Independence Mall West, 8th Floor
                <br />Philadelphia, PA 19106
              </p>
              <p>Web conferencing is available.</p>
              <p>
                Please register by May 23, 2018 via phone at (215) 592-1800 or
                email at{" "}
                <a href="mailto:public_affairs@dvrpc.org">
                  public_affairs@dvrpc.org
                </a>{" "}
                for web conferencing.
              </p>
              <h2>Submit Comments</h2>
              <ul class="list-group">
                <li>
                  <a href="/TIP/Draft/pdf/GuideToCommenting_PA.pdf">
                    Guide to Commenting
                  </a>{" "}
                  <span class="sm">[0.2 MB pdf]</span>
                </li>
              </ul>
              <p>
                Written comments and questions must be submitted in one of four
                ways listed below:
              </p>
              <ul>
                <li>
                  Electronically through a web application available at:
                  www.dvrpc.org/TIP/Draft
                </li>
                <li>
                  By Email: <a href="mailto:TIP@dvrpc.org">TIP@dvrpc.org</a>
                </li>
                <li>
                  By Mail:
                  <br />PA TIP Comments
                  <br />c/o DVRPC Office of Communications and Engagement
                  <br />190 N. Independence Mall West, 8th Fl.
                  <br />Philadelphia, PA 19106-1520
                </li>
                <li>Or by Fax: 215-592-9125.</li>
              </ul>
              <p>
                Questions and comments must be submitted in writing. If you need
                assistance in providing a written comment, please contact the
                DVRPC Office of Communications and Engagement at 215-592-1800 or{" "}
                <a href="mailto:public_affairs@dvrpc.org">
                  public_affairs@dvrpc.org
                </a>.
              </p>
              <p>
                Comments for this document must be received electronically no
                later than 5:00 PM (local time) on June 3, 2018. Comments
                received via mail must be postmarked by June 2, 2018. Responses
                will not be provided unless comments are submitted in writing
                during the public comment period.
              </p>
              <p>
                After consideration of the public comments, the Draft DVRPC
                FY2019 TIP for Pennsylvania with any recommended changes will be
                presented to the DVRPC Board for adoption at the June 28, 2018
                Board meeting.
              </p>

              <div>
                <h2>Detailed Information</h2>
                <ul class="list-group">
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/HighlightsPA19.pdf">
                      Highlights of the Draft FY2019 TIP for PA
                    </a>{" "}
                    <span class="sm">[1.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/volume1-draft.pdf">
                      TIP Document Text (includes abbreviations and codes)
                    </a>{" "}
                    <span class="sm">[1.0 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/GenOverview.pdf">
                      General Overview of the TIP
                    </a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/ProgramSum.pdf">
                      Program Summaries
                    </a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/EJ_TitleVI.pdf">
                      Responding to Environmental Justice (EJ) and Title VI
                      Concerns
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/PBPP.pdf">
                      Performance-Based Planning and Programming (PBPP)
                    </a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/Public.pdf">Public Involvement</a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/TIP19Libraries.pdf">
                      Libraries Displaying the Draft TIP
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/FY2019PATIP_Notice_Posting.pdf">
                      Public Notice
                    </a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/MapAppListings.pdf">
                      Mapping Application and Listings Overview
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/PA-CorresByTitle.pdf">
                      Project Index by Title
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/PA-CorresByMPMS.pdf">
                      Project Index by MPMS#
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/PA-CorresBySIMP.pdf">
                      Project Index for Interstate Management Program (IMP)
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2>Program Lists</h2>
                <ul class="list-group">
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/paprogram.pdf">All Projects</a>{" "}
                    <span class="sm">[2.0 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/buck19d.pdf">Bucks County</a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/ches19d.pdf">Chester County</a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/dela19d.pdf">Delaware County</a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/mont19d.pdf">Montgomery County</a>{" "}
                    <span class="sm">[0.4 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/phil19d.pdf">Philadelphia County</a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/vcpa19d.pdf">
                      Projects in Various Counties
                    </a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/trpa19d.pdf">Transit Projects</a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/simp19d.pdf">
                      Interstate Management Program Projects
                    </a>{" "}
                    <span class="sm">[0.4 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/PA-2019-Competitive-Programs.pdf">
                      Competitive Programs
                    </a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2>Appendices</h2>
                <ul class="list-group">
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/DVRPC-Board-Resolutions.pdf">
                      A – Board Resolutions
                    </a>{" "}
                    <span class="sm">[0.9 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/PA-2019-Financial-Guidance.pdf">
                      B – Financial, and General and Procedural Guidance,
                      including SEPTA' and PART's Financial Capacity Analysis
                    </a>{" "}
                    <span class="sm">[3.0 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/Conformity-19TIP-ExecSum.pdf">
                      C – Executive Summary of the Documentation of the
                      Conformity Finding
                    </a>{" "}
                    <span class="sm">[0.9 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/PATIPMOU-plusPennDOT-FHWA.pdf">
                      E – Memorandum of Understanding on Procedures to Amend and
                      Modify the TIP
                    </a>{" "}
                    <span class="sm">[1.6 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/DVRPC-TIP-Project-Benefit-Criteria-2019.pdf">
                      D – DVRPC TIP Project Benefit Criteria
                    </a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/Draft/pdf/AddendumPubInvolve19.pdf">
                      F – Summary of the TIP Public Involvement Process, Summary
                      of Public Comments, Original Public Comments, Agency
                      Responses, List of Recommended Changes, and Supporting
                      Documentation
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <Comments title={"Submit a General Public Comment"} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    commentResponse: state.getComments.response
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getTIPByKeywords: keywords => {
      dispatch(getTIPByKeywords(keywords));
    },
    setMapCenter: latlng => {
      dispatch(setMapCenter(latlng));
    },
    setMapState: position => {
      dispatch(setMapState(position));
    },
    resetCommentBool: bool => dispatch(resetCommentBool(bool))
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homepage)
);
