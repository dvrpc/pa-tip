# Draft PA TIP FY2021
The Draft DVRPC FY2021 TIP (FY21-FY24) for the Pennsylvania portion of the region was adopted with Recommended Changes as the priority program of transportation projects by the DVRPC Board on July 23, 2020, following a 30+ day public comment period which ended on June 29, 2020. This TIP was developed in cooperation with PennDOT, SEPTA, Pottstown Area Rapid Transit (PART), and DVRPC's member cities and counties (see the Public Notice). The Draft TIP, along with the public comments, agency responses, and List of Recommended Changes, were presented to the DVRPC Board for adoption on July 23, 2020. When also approved by the FHWA and FTA, the DVRPC FY2021 TIP for Pennsylvania will become effective and posted on the DVRPC website on October 1, 2020.

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