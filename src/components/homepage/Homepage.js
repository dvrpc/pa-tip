import Inferno, { Component } from "inferno";
import { withRouter } from "inferno-router";

import Search from "../search/Search.js";

import "./Homepage.css";

import { scrollToElement } from "../../utils/scrollToElement.js";

import logo from "./logo.png";
import TIP_logo from "./TIP_logo.png";
import arrow from "./arrow.png";
import philly from "./philly.mp4";
import firstFrame from "./firstFrame.jpg";

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
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
              <h1>FY2019 Transportation Improvement</h1>
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
                <b>FY2019 TIP for PA</b>
              </li>
              <li>
                <a href="https://www.dvrpc.org/Products/17065/">TIP Guide</a>
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
                FY2019 Transportation Improvement Program for Pennsylvania
                (FY19-22)
              </h2>

              <p>
                Following a 30+ day public comment period, the DVRPC Board
                adopted the DVRPC FY2019 TIP (FY19-22) for the Pennsylvania
                portion of the region with Recommended Changes (see below) as
                the priority program of transportation projects on June 28,
                2018. The regional TIP is included in the Pennsylvania Statewide
                Transportation Improvement Program (STIP), and was developed in
                cooperation with PennDOT, SEPTA, Pottstown Area Rapid Transit
                (PART), and DVRPC's member cities and counties. The TIP has been
                approved by the federal review agencies (FHWA, FTA, and EPA) and
                became the official DVRPC FY2019 TIP for PA on October 1, 2018.
                Program lists (below) are updated on a regular basis as DVRPC
                amends or modifies the program.
              </p>

              <div>
                <h2>Detailed Information</h2>
                <ul class="list-group">
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/HighlightsPA19.pdf">
                      Highlights of the FY2019 TIP for PA
                    </a>{" "}
                    <span class="sm">[1.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/volume1-final.pdf">
                      TIP Document Text (includes abbreviations and codes)
                    </a>{" "}
                    <span class="sm">[1.0 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/GenOverview.pdf">
                      General Overview of the TIP
                    </a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/ProgramSum.pdf">Program Summaries</a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/EJ_TitleVI.pdf">
                      Responding to Environmental Justice (EJ) and Title VI
                      Concerns
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PBPP.pdf">
                      Performance-Based Planning and Programming (PBPP)
                    </a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/Public.pdf">Public Involvement</a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/TIP19Libraries.pdf">
                      Libraries Displaying the TIP
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/MajorStatus19.pdf">
                      Major Project Status Report
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/FY2019PATIP_Notice_Posting.pdf">
                      Public Notice
                    </a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/MapAppListings.pdf">
                      Mapping Application and Listings Overview
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PA-CorresByTitle.pdf">
                      Project Index by Title
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PA-CorresByMPMS.pdf">
                      Project Index by MPMS#
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PA-CorresBySIMP.pdf">
                      Project Index for Interstate Management Program (IMP)
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                </ul>
              </div>

              <div>
                <h2>Summary of Amendments and Modifications</h2>
                <p>
                  DVRPC will update these project listings (generally each
                  month), as we amend or modify the TIP, as permitted under the
                  TIP MOU. The{" "}
                  <a href="/TIP/PA/pdf/actpa19.pdf">
                    Summary of Amendments and Modifications
                  </a>{" "}
                  <span class="sm">[0.3 MB pdf]</span> provides a chronological
                  listing of all project changes.
                </p>
              </div>

              <div>
                <h2>Program Lists</h2>
                <ul class="list-group">
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/paprogram.pdf">All Projects</a>{" "}
                    <span class="sm">[2.0 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/buck19f.pdf">Bucks County</a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/ches19f.pdf">Chester County</a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/dela19f.pdf">Delaware County</a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/mont19f.pdf">Montgomery County</a>{" "}
                    <span class="sm">[0.4 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/phil19f.pdf">Philadelphia County</a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/vcpa19f.pdf">
                      Projects in Various Counties
                    </a>{" "}
                    <span class="sm">[0.2 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/trpa19f.pdf">Transit Projects</a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/simp19f.pdf">
                      Interstate Management Program Projects
                    </a>{" "}
                    <span class="sm">[0.4 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PA-2019-Competitive-Programs.pdf">
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
                    <a href="/TIP/PA/pdf/DVRPC-Board-Resolutions.pdf">
                      A – Board Resolutions
                    </a>{" "}
                    <span class="sm">[0.9 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PA-2019-Financial-Guidance.pdf">
                      B – State DOT Financial Guidance
                    </a>{" "}
                    <span class="sm">[3.0 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PATIPMOU-plusPennDOT-FHWA.pdf">
                      C – Memorandum of Understanding on Procedures to Amend and
                      Modify the TIP
                    </a>{" "}
                    <span class="sm">[0.9 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/DVRPC-TIP-Project-Benefit-Criteria-2019.pdf">
                      D – DVRPC TIP Project Benefit Criteria
                    </a>{" "}
                    <span class="sm">[0.3 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PA-2019-Procedural-Guidance.pdf">
                      E – State DOT General and Procedural Guidance
                    </a>{" "}
                    <span class="sm">[1.6 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/PA-2019-SEPTA-PART-Financial-Capacity-Analysis.pdf">
                      F – SEPTA’s and PART’s Financial Capacity Analysis
                    </a>{" "}
                    <span class="sm">[0.1 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/Conformity-19TIP-ExecSum.pdf">
                      G - Executive Summary of the Documentation of the
                      Conformity Finding
                    </a>{" "}
                    <span class="sm">[0.4 MB pdf]</span>
                  </li>
                  <li class="list-group-item">
                    <a href="/TIP/PA/pdf/AddendumPubInvolve19.pdf">
                      H - Summary of the TIP Public Involvement Process; Summary
                      of Public Comments; Original Public Comments; Agency
                      responses; List of Recommended Changes; and Supporting
                      Documentation
                    </a>{" "}
                    <span class="sm">[29 MB pdf]</span>
                  </li>
                </ul>
              </div>

              <div id="obligation-table-wrapper">
                <h2>Obligation Summary</h2>
                <table id="obligation-summary-table">
                  <tbody>
                    <tr>
                      <td>FY2019:</td>

                      <td>
                        <a href="/TIP/PA/pdf/3130_DVRPCSummary19.pdf">
                          Summary
                        </a>{" "}
                        <span class="sm">[0.03 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/3130_DVRPCandInterstateDetails19.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.3 MB pdf]</span>
                      </td>
                    </tr>
                    <tr>
                      <td>FY2018:</td>

                      <td>
                        <a href="/TIP/PA/pdf/2794_DVRPCSummary18.pdf">
                          Summary
                        </a>{" "}
                        <span class="sm">[0.03 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/2794_DVRPCandInterstateDetails18.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.7 MB pdf]</span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>FY2017:</td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCSummary17.pdf">Summary</a>{" "}
                        <span class="sm">[0.04 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCandInterstateDetails17.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.3 MB pdf]</span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>FY2016:</td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCSummary16.pdf">Summary</a>{" "}
                        <span class="sm">[0.04 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCandInterstateDetails16.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.3 MB pdf]</span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>FY2015:</td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCSummary15.pdf">Summary</a>{" "}
                        <span class="sm">[0.07 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCandInterstateDetails15.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.4 MB pdf]</span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>FY2014:</td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCSummary14.pdf">Summary</a>{" "}
                        <span class="sm">[0.1 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCandInterstateDetails14.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.4 MB pdf]</span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>FY2013:</td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCSummary13.pdf">Summary</a>{" "}
                        <span class="sm">[0.08 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCandInterstateDetails13.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.6 MB pdf]</span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>FY2012:</td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCSummary12.pdf">Summary</a>{" "}
                        <span class="sm">[0.3 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCandInterstateDetails12.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.6 MB pdf]</span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>FY2011:</td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCSummary11.pdf">Summary</a>{" "}
                        <span class="sm">[0.3 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCandInterstateDetails11.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.7 MB pdf]</span>
                        <br />
                      </td>
                    </tr>

                    <tr>
                      <td>FY2010:</td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCSummary10.pdf">Summary</a>{" "}
                        <span class="sm">[0.3 MB pdf]</span>
                      </td>

                      <td>
                        <a href="/TIP/PA/pdf/DVRPCandInterstateDetails10.pdf">
                          Details
                        </a>{" "}
                        <span class="sm">[0.8 MB pdf]</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Homepage);
