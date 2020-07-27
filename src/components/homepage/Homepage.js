import React, { Component } from "react";
// @COMMENTS: add when comment period opens
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Search from "../search/Search.js";
import Footer from "../footer/Footer.js";
// @COMMENTS: add when comment period opens
import ReadOnlyComments from "../comments/ReadOnlyComments.js";

import "./Homepage.css";

// @COMMENTS: add when comment period opens
import { getGeneralComments } from "../../redux/reducers/commentsReducer.js";
import { scrollToElement } from "../../utils/scrollToElement.js";

import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";
import philly from "./philly.mp4";
import firstFrame from "./firstFrame.jpg";

class Homepage extends Component {
  // @COMMENTS: add when comment period closes
  componentDidMount() {
    this.props.getGeneralComments();
  }
  toTop = () => window.scroll({ top: 0, behavior: "smooth" });

  render() {
    // @COMMENTS: add when comment period closes
    const comments = this.props.comments.comments || [];
    console.log("comments ", comments);

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
                The Draft DVRPC FY2021 TIP (FY21-FY24) for the Pennsylvania
                portion of the region was adopted with Recommended Changes as
                the priority program of transportation projects by the DVRPC
                Board on July 23, 2020, following a 30+ day public comment
                period which ended on June 29, 2020. This TIP was developed in
                cooperation with PennDOT, SEPTA, Pottstown Area Rapid Transit
                (PART), and DVRPC's member cities and counties (see the{" "}
                <a href="/GetInvolved/PublicNotices/2020-TIP-LRP.html?utm_source=feedburner&utm_medium=feed&utm_campaign=Feed%3A+DvrpcAnnouncements+(DVRPC+Announcements)&utm_content=FeedBurner">
                  Public Notice
                </a>
                ). The Draft TIP, along with the public comments, agency
                responses, and List of Recommended Changes, were presented to
                the DVRPC Board for adoption on July 23, 2020. When also
                approved by the FHWA and FTA, the DVRPC FY2021 TIP for
                Pennsylvania will become effective and posted on the DVRPC
                website on October 1, 2020.
              </p>
              <p>
                The 30+ day public comment period from May 26, 2016 to June 29,
                2020 was conducted jointly with PennDOT, SEPTA, and PART. It
                allowed the public an opportunity to review and comment on the
                program prior to it being presented to the DVRPC Board for
                adoption. DVRPC also solicited public comment on an amendment to
                the Connections 2045 long range plan held concurrently with
                Draft TIP, as well as the Draft Transportation Conformity
                Finding from June 3, 2016 to July 6, 2020.
              </p>
              <p>
                Comments are no longer being accepted on the Draft DVRPC FY2021
                TIP for PA. Responses to written comments are available on the
                DVRPC website via the TIP Comment/Search/Map Tool.
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
            <section>
              <h2 className="info-section-header">General Public Comments</h2>
              <ReadOnlyComments comments={comments} />
            </section>
          </article>
        </main>

        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  comments: state.getComments
});

const mapDispatchToProps = dispatch => ({
  getGeneralComments: () => dispatch(getGeneralComments())
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Homepage)
);
