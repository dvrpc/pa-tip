# PA TIP 2018
The Delaware Valley Regional Planning Commission (DVRPC) is pleased to present the DVRPC Fiscal Year 2019 Transportation Improvement Program (TIP) for Pennsylvania (FY19-FY22). DVRPC and its PA member governments have worked diligently to prepare a program of projects that responds to the needs of the region and at the same time complies with federal and state policies. The TIP is the regionally agreed-upon list of priority transportation projects, and federal law requires showing at least four federal fiscal years of programming. This document, referred to as the FY2019 TIP for PA includes cost, phase, and schedule information for transportation projects in each of the federal fiscal years FY19-FY22 for Bucks, Chester, Delaware, Montgomery, and Philadelphia Counties.

## What is the PA TIP web viewer?
The PA TIP web app hosts information about the PA TIP as well as an interactive map containing every PA TIP project. Users can search by keyword, project name or location to find the projects they are interested in. From the map view, users can pan and zoom to reveal more projects and can filter projects by type. Projects are displayed as icons on the map as well as either list items or tiles with satellite imagery on the sidebar. Clicking on a project either in the map or on the sidebar will bring users to a detailed view that has all of the project information including funding and milestones tables. Users can print all of the detailed information by clicking the 'print' button.

## How was it made?
The app is built in React, bootstrapped with create-react-app. The web mapping component is built on top of Mapbox GL JS. The projects and several of the map overlay layers are custom made vector tiles hosted by Digital Ocean. The other map overlay layers are geoJSON's loaded in from DVRPC's ArcGIS online portal.

## Getting started
- `cd` to project directory
- `git clone https://github.com/dvrpc/pa-tip.git`
- `npm install`
- `npm start`

## Build
Make sure your current working tree is clean and up to date with the latest, stable version of the TIP.
- (optional) delete the 'static' folder from /TIP/PA/ to make sure old, unused bundles with different names are removed
- `npm run build`
- copy files from the 'build' folder to the /TIP/PA/ folder on staging