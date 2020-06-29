import React, { Component } from "react";
// @COMMENTS: add when comment period opens
// import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Search from "../search/Search.js";
import Footer from "../footer/Footer.js";
// @COMMENTS: add when comment period opens
// import ReadOnlyComments from "../comments/ReadOnlyComments.js";

import "./Homepage.css";

// @COMMENTS: add when comment period opens
// import { getGeneralComments } from "../../redux/reducers/commentsReducer.js";
import { scrollToElement } from "../../utils/scrollToElement.js";

import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";
import philly from "./philly.mp4";
import firstFrame from "./firstFrame.jpg";

class Homepage extends Component {
  // @COMMENTS: add when comment period closes
  // componentDidMount() {
  //   this.props.getGeneralComments();
  // }
  toTop = () => window.scroll({ top: 0, behavior: "smooth" });

  render() {
    // @COMMENTS: add when comment period closes
    // const comments = this.props.comments.comments || [];

    return (
      <div className="homepage">
        <div className="landing">
          <header className="homepage-banner">
            <div id="banner-logo">
              <a href="https://www.dvrpc.org/">
                <img src={logo} alt="dvrpc logo" id="dvrpc-logo" />
              </a>
            </div>
            <div className="stacked-headers">
              <img
                id="banner-tip-logo"
                src={TIP_logo}
                alt="Transportation Improvement Program logo"
              />
              <h1>
                Draft FY2021 Transportation Improvement
                <br />
                Program for Pennsylvania (FY21-24)
              </h1>
            </div>
          </header>

          <div className="homepage-main">
            <video
              playsInline
              autoPlay
              muted
              loop
              poster={firstFrame}
              id="bgvid"
            >
              <source src={philly} type="video/mp4" />
            </video>
            <div id="search-form">
              <Search />
            </div>
          </div>

          <div className="homepage-bottom-bar">
            <a
              href="#tip-info"
              onClick={e => {
                scrollToElement(this, e, "tipInfo");
              }}
            >
              More Information
              {/* <img src={arrow} alt="down navigation arrow" /> */}
            </a>
            <a
              href="#tip-info"
              onClick={e => {
                scrollToElement(this, e, "tipInfo");
              }}
            >
              <span>&darr;</span>
            </a>
          </div>
        </div>

        <main id="tip-info" ref={el => (this.tipInfo = el)}>
          <aside id="nav-links-box">
            <ul>
              <li>
                <b>Transportation Improvement Program (TIP)</b>
              </li>
              <li>
                <a href="https://www.dvrpc.org/TIP/">TIP Homepage</a>
              </li>
              <li>
                <b>Draft FY2021 TIP for PA</b>
              </li>
              <li>
                <a href="https://www.dvrpc.org/Products/17065/">TIP Guide</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/TIP/PA/">FY2019 TIP for PA</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/ProjectImplementation/">
                  Project Implementation
                </a>
              </li>
            </ul>

            <hr id="nav-links-hr" />

            <div id="homepage-to-top" onClick={this.toTop}>
              <span>&uarr;</span>
              <div>to top</div>
            </div>
          </aside>

          <article id="tip-info-paragraphs">
            <section>
              <h2 className="info-section-header" id="main-section-header">
                Draft FY2021 Transportation Improvement Program for Pennsylvania
                (FY21-24)
              </h2>
              <p>
                DVRPC's Draft TIP for Pennsylvania represents the region's
                federally funded transportation improvement priorities and is
                required by federal law in order for the region to receive and
                spend federal transportation funds. It has been developed in
                cooperation with the Pennsylvania Department of Transportation
                (PennDOT), Southeastern Transportation Authority (SEPTA),
                Pottstown Area Rapid Transit (PART) and DVRPC's member counties
                and cities. After consideration of public comments, the Draft
                TIP with any recommended changes will be presented to the DVRPC
                Board for adoption at the regularly scheduled Board meeting on
                July 23, 2020.
              </p>
              <p>
                DVRPC invites you to review and comment on the Draft FY2021 TIP
                for the DVRPC PA counties as well as{" "}
                <a href="/TIP/Draft/pdf/stwd21d.pdf">
                  PennDOT's Statewide Items (STWD Items) TIP
                </a>
                <span className="sm"> [1.8 MB pdf]</span> and{" "}
                <a href="/TIP/Draft/pdf/simp21d.pdf">
                  Statewide Interstate Management Program
                </a>
                <span className="sm"> [3.5 MB pdf]</span>. The public comment
                period will end at 5:00 PM local time on Monday, June 29, 2020.
              </p>
              <p>
                The public comment period for the Draft DVRPC FY2021 TIP for
                Pennsylvania opens on May 26, 2020 at 5:00 PM (local time), and
                extends through June 29, 2020 at 5:00 PM (local time). Two
                online open houses will be held at the following web address for
                the purpose of informing interested parties on how to make
                public comments on the Draft DVRPC FY2021 TIP:
              </p>
              <div>
                <p>
                  <strong>Wednesday, June 17, 2020</strong>
                  <br />
                  <strong>2:00 PM</strong> to <strong>3:00 PM</strong>
                  <br />
                  <strong>Call-in information: </strong>646-558-8656
                  <br />
                  <strong>Webinar ID: </strong>928 8347 2086;
                  <br />
                  <strong>Password: </strong>0b1&E1fB
                  <br />
                  <button className="btn">
                    <a
                      href="https://dvrpc.zoom.us/webinar/register/WN_l8Hr6IsaTk--nFbKxD1lLw"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Registration
                    </a>
                  </button>
                  <br />
                </p>
                <p>
                  <strong>Wednesday, June 17, 2020</strong>
                  <br />
                  <strong>7:00 PM</strong> to <strong>8:00 PM</strong>
                  <br />
                  <strong>Call-in information: </strong>646-558-8656
                  <br />
                  <strong>Webinar ID: </strong>969 5255 6273;
                  <br />
                  <strong>Password: </strong>0b1&E1fB
                  <br />
                  <button className="btn">
                    <a
                      href="https://dvrpc.zoom.us/webinar/register/WN_oFLiQk-eRnyyOEpHu4wdOQ"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Registration
                    </a>
                  </button>
                  <br />
                </p>
              </div>
              <p>
                While participants need to register beforehand, they are
                approved automatically and can register and join the meetings up
                until the meetings end. Additionally, people who would like to
                participate but do not have internet access or smart phones can
                call in. Anyone who needs accommodations, such as closed
                captioning or interpretation, can contact DVRPC’s Office of
                Communications & Engagement at{" "}
                <a href="mailto:public_affairs@dvrpc.org">
                  public_affairs@dvrpc.org
                </a>{" "}
                or 215-238-2929.
              </p>
            </section>

            <section>
              <h2 className="info-section-header">
                How to Submit a Public Comment
              </h2>
              <p>
                Submit comments online by clicking the “SEARCH DRAFT TIP
                PROJECTS BY ADDRESS OR KEYWORDS OR SUBMIT COMMENT” feature in
                order for a response to be provided in the final TIP document.
                You can still send comments by:
              </p>
              <ul style={{ fontSize: "initial" }}>
                <li>
                  email to <a href="mailto:TIP@dvrpc.org">TIP@dvrpc.org</a>;
                </li>
                <li>fax to (215) 592 – 9125; or</li>
                <li>
                  mail to the address at the bottom of this page, Attention: PA
                  TIP Comments.
                </li>
              </ul>
              <strong>
                <a href="/TIP/Draft/pdf/tips.pdf">Click here</a> to view helpful
                tips that can make a public comment more effective
              </strong>
              <span className="sm"> [0.2 MB pdf]</span>
            </section>

            <section>
              <h2 className="info-section-header">
                What Happens After the Public Comment Period Ends?
              </h2>
              <p>
                Written comments received during the public comment period and
                responses to those comments will be provided in the final
                printed TIP document as part of the public record. After
                consideration of the public comments received, the Draft TIP
                with any recommended changes will be presented to the DVRPC
                Board for adoption at the July 23, 2020 regularly scheduled
                Board meeting. Note that comments received after the comment
                period is over will not receive a response or be included in the
                final TIP document.
              </p>
            </section>

            <section>
              <h2 className="info-section-header">Detailed Information</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/HighlightsPA21.pdf">
                    Highlights of the Draft FY2021 TIP for PA
                  </a>{" "}
                  <span className="sm">[ MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/esHighlightsPA21.pdf">
                    Aspectos destacados del TIP para el FY2021 de Pennsylvania
                    (FY21-FY24)
                  </a>{" "}
                  <span className="sm">[151 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/DraftTIPPA21.pdf">
                    Full Draft FY2021 TIP for PA Document
                  </a>{" "}
                  <span className="sm">[235 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/GenOverview.pdf">
                    Chapter 1: General Overview of the TIP
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/ProgramSum.pdf">
                    Chapter 2: Program Summaries
                  </a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/EJ_TitleVI.pdf">
                    Chapter 3: Responding to Environmental Justice (EJ) and
                    Title VI Concerns
                  </a>{" "}
                  <span className="sm">[0.8 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/PBPP.pdf">
                    Chapter 4: Performance-Based Planning and Programming (PBPP)
                  </a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/Public.pdf">
                    Chapter 5: Public Involvement
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                  <ul style={{ fontSize: "initial" }}>
                    <li>
                      <a href="/GetInvolved/PublicNotices/2020-TIP-LRP.html">
                        Legal Notice
                      </a>
                    </li>
                    <li>
                      <a href="/TIP/Draft/pdf/tips.pdf">
                        Make Your Public Comment More Effective (see above)
                      </a>
                      <span className="sm"> [0.2 MB pdf]</span>
                    </li>
                  </ul>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/MapAppListings.pdf">
                    Chapter 6: Mapping Application and Listings Overview
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/CodesAbbr.pdf">
                    Chapter 7: Codes and Abbreviations Overview
                  </a>{" "}
                  <span className="sm">[0.4 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/PA-2021-Competitive-Programs.pdf">
                    Chapter 8: Competitive Programs
                  </a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/ProgramLists21d.pdf">
                    Chapter 9: Program Listings
                  </a>{" "}
                  <span className="sm">[1.9 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  Helpful Project Indices:
                  <ul style={{ fontSize: "initial" }}>
                    <li>
                      <a href="/TIP/Draft/pdf/PA-CorresByTitle.pdf">
                        Project Index by Title
                      </a>{" "}
                      <span className="sm">[0.1 MB pdf]</span>
                    </li>
                    <li>
                      <a href="/TIP/Draft/pdf/PA-CorresByMPMS.pdf">
                        Project Index by MPMS#
                      </a>{" "}
                      <span className="sm">[0.1 MB pdf]</span>
                    </li>
                    <li>
                      <a href="/TIP/Draft/pdf/PA-CorresByDVRPCIMP.pdf">
                        Project Index for Interstate Management Program (IMP)
                      </a>{" "}
                      <span className="sm">[0.1 MB pdf]</span>
                    </li>
                  </ul>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/paprogram.pdf">
                    All Projects in DVRPC PA Region
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/roadmapPA.pdf">
                    Draft TIP Project Listing Roadmap
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="info-section-header">
                DVRPC Regional Highway Program by County
              </h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/buck21d.pdf">Bucks County</a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/ches21d.pdf">Chester County</a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/dela21d.pdf">Delaware County</a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/mont21d.pdf">Montgomery County</a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/phil21d.pdf">Philadelphia County</a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/vcpa21d.pdf">
                    Projects in Various Counties
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/dvrpcimp21d.pdf">
                    Interstate Management Program in the DVRPC Region
                  </a>{" "}
                  <span className="sm">[0.5 MB pdf]</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="info-section-header">
                DVRPC Regional Transit Program by Operator
              </h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/part21d.pdf">PART Projects</a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/septa21d.pdf">SEPTA Projects</a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="info-section-header">
                PennDOT Statewide Programs
              </h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/stwd21d.pdf">
                    PennDOT's Statewide Items TIP
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/simp21d.pdf">
                    PennDOT's Interstate Management Program
                  </a>{" "}
                  <span className="sm">[3.5 MB pdf]</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="info-section-header">Appendices</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/DVRPC-Board-Resolutions.pdf">
                    A – Acknowledgement of Board Resolutions
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/PA-2021-FinGenPro-Guidance.pdf">
                    B – State DOT Financial, and General and Procedural Guidance
                    (Includes SPETA’s Financial Capacity Analysis)
                  </a>{" "}
                  <span className="sm">[11 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/Conformity-21TIP-ExecSum.pdf">
                    C – Acknowledgement of the Executive Summary of the Draft
                    Documentation of the Conformity Finding (Executive Summary)
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/DVRPC-TIP-Project-Benefit-Criteria-2021.pdf">
                    D – DVRPC TIP Project Benefit Criteria
                  </a>{" "}
                  <span className="sm">[0.4 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/PATIPMOU-plusPennDOT-FHWA.pdf">
                    E – Memorandum of Understanding on Procedures to Amend and
                    Modify the TIP
                  </a>{" "}
                  <span className="sm">[0.4 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/EJAppendix.pdf">
                    F – Environmental Justice Appendix
                  </a>{" "}
                  <span className="sm">[34 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/Draft/pdf/AddendumPubInvolve21.pdf">
                    G - Acknowledgment of Summary of the TIP Public Involvement
                    Process, Summary of Public Comments, Original Public
                    Comments, Agency Responses, List of Recommended Changes, and
                    Supporting Documentation
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
              </ul>
            </section>

            {/* <section id="obligation-table-wrapper">
              <h2 className="info-section-header">Obligation Summary</h2>
              <table id="obligation-summary-table">
                <tbody>
                  <tr>
                    <td>FY2019:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary19.pdf">Summary</a>{" "}
                      <span className="sm">[0.03 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails19.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>
                  </tr>
                  <tr>
                    <td>FY2018:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/2794_DVRPCSummary18.pdf">
                        Summary
                      </a>{" "}
                      <span className="sm">[0.03 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/2794_DVRPCandInterstateDetails18.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.7 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2017:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary17.pdf">Summary</a>{" "}
                      <span className="sm">[0.04 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails17.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2016:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary16.pdf">Summary</a>{" "}
                      <span className="sm">[0.04 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails16.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2015:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary15.pdf">Summary</a>{" "}
                      <span className="sm">[0.07 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails15.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.4 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2014:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary14.pdf">Summary</a>{" "}
                      <span className="sm">[0.1 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails14.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.4 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2013:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary13.pdf">Summary</a>{" "}
                      <span className="sm">[0.08 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails13.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.6 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2012:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary12.pdf">Summary</a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails12.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.6 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2011:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary11.pdf">Summary</a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails11.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.7 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2010:</td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCSummary10.pdf">Summary</a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/Draft/pdf/DVRPCandInterstateDetails10.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.8 MB pdf]</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section> */}
          </article>
        </main>

        <Footer />
      </div>
    );
  }
}

// @COMMENTS: add when comment period opens
// const mapStateToProps = state => ({
//   comments: state.getComments
// });

// const mapDispatchToProps = dispatch => ({
//   getGeneralComments: () => dispatch(getGeneralComments())
// });

// export default withRouter(
//   connect(mapStateToProps, mapDispatchToProps)(Homepage)
// );

export default withRouter(Homepage);
