import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Search from "../search/Search.js";
import Footer from "../footer/Footer.js";

import "./Homepage.css";

import { scrollToElement } from "../../utils/scrollToElement.js";

import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";
import philly from "./philly.mp4";
import firstFrame from "./firstFrame.jpg";

class Homepage extends Component {
  toTop = () => window.scroll({ top: 0, behavior: "smooth" });

  render() {
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
                FY2021 Transportation Improvement
                <br />
                Program for Pennsylvania (FY21-FY24)
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
            <a href="/TIP/PA/keyword/*" className="homepage-bottom-bar-a">
              View Full TIP Map
            </a>

            <span className="homepage-bottom-bar-vr">|</span>

            <a
              href="#tip-info"
              className="homepage-bottom-bar-a"
              onClick={e => {
                scrollToElement(this, e, "tipInfo");
              }}
            >
              More Information
            </a>
            <a
              href="#tip-info"
              className="homepage-bottom-bar-a"
              onClick={e => {
                scrollToElement(this, e, "tipInfo");
              }}
            >
              <span className="homepage-bottom-bar-icon">&darr;</span>
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
                <a href="https://arcg.is/19nnb0">TIP Fundamentals</a>
              </li>
              <li>
                <a href="https://www.dvrpc.org/Products/17065/">TIP Guide</a>
              </li>
              <li>
                <b>FY2021 TIP for PA</b>
              </li>
              <li>
                <a href="https://www.dvrpc.org/TIP/NJ/">FY2022 TIP for NJ</a>
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
                FY2021 Transportation Improvement Program for Pennsylvania
                (FY21-FY24)
              </h2>
              <p>
                Following a 30+ day public comment period, the DVRPC Board
                adopted the DVRPC FY2021 TIP (FY21-FY24) for the Pennsylvania
                portion of the region with Recommended Changes (see below) as
                the priority program of transportation projects on July 23,
                2020. The regional TIP is included in the Pennsylvania Statewide
                Transportation Improvement Program (STIP), and was developed in
                cooperation with PennDOT, SEPTA, Pottstown Area Rapid Transit
                (PART), and DVRPC&#39;s member cities and counties. The TIP has
                been approved by the federal review agencies (FHWA, FTA, and
                EPA) and became the official DVRPC FY2021 TIP for PA on October
                1, 2020. Program lists (below) are updated on a regular basis as
                DVRPC amends or modifies the program.
              </p>
              <p>
                <a href="/TIP/PA/pdf/effective.pdf">Click here</a>{" "}
                <span className="sm">[0.2 MB pdf]</span> to view helpful tips
                that can make a public comment more effective.
              </p>
              <a href="https://arcg.is/19nnb0" rel="external">
                <figure>
                  <img
                    src="https://www.dvrpc.org/TIP/img/TIPStoryMapScreenshot.png"
                    alt="TIP Fundamentals"
                  />
                  <figcaption>TIP Fundamentals: Learn the Basics</figcaption>
                </figure>
              </a>
            </section>

            <section>
              <h2 className="info-section-header">Detailed Information</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/HighlightsPA21.pdf">
                    Highlights of the FY2021 TIP for PA
                  </a>{" "}
                  <span className="sm">[30 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/reports/21001Ces.pdf">
                    Aspectos destacados del TIP para el FY2021 de Pennsylvania
                    (FY21-FY24)
                  </a>{" "}
                  <span className="sm">[5 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/TIPPA21.pdf">
                    Full FY2021 TIP for PA Document
                  </a>{" "}
                  <span className="sm">[47 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/GenOverview.pdf">
                    Chapter 1: General Overview of the TIP
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/ProgramSum.pdf">
                    Chapter 2: Program Summaries
                  </a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/EJ_TitleVI.pdf">
                    Chapter 3: Responding to Environmental Justice (EJ) and
                    Title VI Concerns
                  </a>{" "}
                  <span className="sm">[0.8 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/PBPP.pdf">
                    Chapter 4: Performance-Based Planning and Programming (PBPP)
                  </a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/Public.pdf">
                    Chapter 5: Public Involvement
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/MapAppListings.pdf">
                    Chapter 6: Mapping Application and Listings Overview
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/CodesAbbr.pdf">
                    Chapter 7: Codes and Abbreviations Overview
                  </a>{" "}
                  <span className="sm">[0.4 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/PA-2021-Competitive-Programs.pdf">
                    Chapter 8: Competitive Programs
                  </a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/ProgramLists21f.pdf">
                    Chapter 9: Program Listings
                  </a>{" "}
                  <span className="sm">[1.9 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/MajorStatus21.pdf">
                    Chapter 10: Major Project Status Report
                  </a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  Helpful Project Indices:
                  <ul style={{ fontSize: "initial" }}>
                    <li>
                      <a href="/TIP/PA/pdf/PA-CorresByTitle.pdf">
                        Project Index by Title
                      </a>{" "}
                      <span className="sm">[0.1 MB pdf]</span>
                    </li>
                    <li>
                      <a href="/TIP/PA/pdf/PA-CorresByMPMS.pdf">
                        Project Index by MPMS#
                      </a>{" "}
                      <span className="sm">[0.1 MB pdf]</span>
                    </li>
                    <li>
                      <a href="/TIP/PA/pdf/PA-CorresByDVRPCIMP.pdf">
                        Project Index for Interstate Management Program (IMP)
                      </a>{" "}
                      <span className="sm">[0.1 MB pdf]</span>
                    </li>
                  </ul>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/ProgramLists21f.pdf">
                    All Projects in DVRPC PA Region
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/roadmapPA.pdf">
                    TIP Project Listing Roadmap
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="info-section-header">
                Summary of Amendments and Modifications
              </h2>
              <p>
                DVRPC will update these project listings (generally each month),
                as we amend or modify the TIP, as permitted under the TIP MOU.{" "}
                <a href="./pdf/actpa21.pdf">
                  The Summary of Amendments and Modifications
                </a>
                <span className="sm"> [0.3 MB pdf]</span> provides a
                chronological listing of all project changes.
              </p>
              <h2 className="info-section-header">
                DVRPC Regional Highway Program by County
              </h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/buck21f.pdf">Bucks County</a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/ches21f.pdf">Chester County</a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/dela21f.pdf">Delaware County</a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/mont21f.pdf">Montgomery County</a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/phil21f.pdf">Philadelphia County</a>{" "}
                  <span className="sm">[0.3 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/vcpa21f.pdf">
                    Projects in Various Counties
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/dvrpcimp21f.pdf">
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
                  <a href="/TIP/PA/pdf/penndottransit21f.pdf">
                    PennDOT Transit Projects
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/part21f.pdf">PART Projects</a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/septa21f.pdf">SEPTA Projects</a>{" "}
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
                  <a href="/TIP/PA/pdf/stwd21f.pdf">
                    PennDOT's Statewide Items TIP
                  </a>{" "}
                  <span className="sm">[0.1 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/simp21f.pdf">
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
                  <a href="/TIP/PA/pdf/DVRPC-Board-Resolutions.pdf">
                    A – Board Resolutions
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/PA-2021-FinancialGuidance.pdf">
                    B – State DOT Financial Guidance
                  </a>{" "}
                  <span className="sm">[11 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/PATIPMOU-plusPennDOT-FHWA.pdf">
                    C – Memorandum of Understanding on Procedures to Amend and
                    Modify the TIP
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/DVRPC-TIP-Project-Benefit-Criteria-2021.pdf">
                    D – DVRPC TIP Project Benefit Criteria
                  </a>{" "}
                  <span className="sm">[0.4 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/PA-2021-Procedural-Guidance.pdf">
                    E – General and Procedural Guidance
                  </a>{" "}
                  <span className="sm">[0.4 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/EJAppendix.pdf">
                    F – Environmental Justice Appendix
                  </a>{" "}
                  <span className="sm">[34 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/PA-2021-SEPTA-Financial-Capacity-Analysis.pdf">
                    G - SEPTA Financial Capacity Analysis and TAMP Plan
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/Conformity-21TIP-ExecSum.pdf">
                    H - Executive Summary of the Documentation of the Conformity
                    Finding
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/AddendumPubInvolve21.pdf">
                    I - Summary of the TIP Public Involvement Process, Summary
                    of Public Comments, Original Public Comments, Agency
                    Responses, List of Recommended Changes, and Supporting
                    Documentation
                  </a>{" "}
                  <span className="sm">[206 MB pdf]</span>
                </li>
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/6079_FY2021PATIP_TransitSafety.pdf">
                    J - Transit Safety Performance Measure
                  </a>{" "}
                  <span className="sm">[0.2 MB pdf]</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="info-section-header">
                Annual List of Federally Obligated Projects for PA
              </h2>
              <ul className="list-group">
                <li className="list-group-item">
                  <a href="/TIP/PA/pdf/DVRPC-FFY-2021-Annual-Obligations-Report.pdf">
                    PA FY21 Obligations for Highway and Transit Projects
                  </a>
                  <span className="sm">[0.6 MB pdf]</span>
                </li>
              </ul>
            </section>

            <section id="obligation-table-wrapper">
              <h2 className="info-section-header">Obligation Summary</h2>
              <table id="obligation-summary-table">
                <tbody>
                  <tr>
                    <td>FY2022:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary22.pdf">Summary</a>{" "}
                      <span className="sm">[0.2 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails22.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.4 MB pdf]</span>
                    </td>
                  </tr>
                  <tr>
                    <td>FY2021:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary21.pdf">Summary</a>{" "}
                      <span className="sm">[0.2 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails21.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.4 MB pdf]</span>
                    </td>
                  </tr>
                  <tr>
                    <td>FY2020:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary20.pdf">Summary</a>{" "}
                      <span className="sm">[0.03 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails20.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>
                  </tr>
                  <tr>
                    <td>FY2019:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary19.pdf">Summary</a>{" "}
                      <span className="sm">[0.03 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails19.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>
                  </tr>
                  <tr>
                    <td>FY2018:</td>

                    <td>
                      <a href="/TIP/PA/pdf/2794_DVRPCSummary18.pdf">Summary</a>{" "}
                      <span className="sm">[0.03 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/2794_DVRPCandInterstateDetails18.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.7 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2017:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary17.pdf">Summary</a>{" "}
                      <span className="sm">[0.04 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails17.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2016:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary16.pdf">Summary</a>{" "}
                      <span className="sm">[0.04 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails16.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2015:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary15.pdf">Summary</a>{" "}
                      <span className="sm">[0.07 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails15.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.4 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2014:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary14.pdf">Summary</a>{" "}
                      <span className="sm">[0.1 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails14.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.4 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2013:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary13.pdf">Summary</a>{" "}
                      <span className="sm">[0.08 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails13.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.6 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2012:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary12.pdf">Summary</a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails12.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.6 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2011:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary11.pdf">Summary</a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails11.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.7 MB pdf]</span>
                      <br />
                    </td>
                  </tr>

                  <tr>
                    <td>FY2010:</td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCSummary10.pdf">Summary</a>{" "}
                      <span className="sm">[0.3 MB pdf]</span>
                    </td>

                    <td>
                      <a href="/TIP/PA/pdf/DVRPCandInterstateDetails10.pdf">
                        Details
                      </a>{" "}
                      <span className="sm">[0.8 MB pdf]</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>
          </article>
        </main>

        <Footer />
      </div>
    );
  }
}

export default withRouter(Homepage);
