import { withRouter } from "inferno-router";
import Inferno, { Component, linkEvent } from "inferno";
import "./legend.css";

class Legend extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "Transportation Improvement Projects": {
        show: true,
        classifications: new Array(),
        short: "TIP",
        sub: "FY2019–FY2022",
        source:
          "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Pennsylvania_Transportation_Improvement_Program_(TIP)_2019-2022/FeatureServer/0",
        queryFields: ["DESCRPTIO"]
      },
      "Indicators of Potential Disadvantage": {
        show: false,
        classifications: new Array(),
        short: "IPD",
        sub: "Composite Score",
        source:
          "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/IPD_2016/FeatureServer/0",
        queryFields: ["IPD_SCORE"]
      },
      "CMP Corridors": {
        show: false,
        classifications: new Array(),
        short: "CMP",
        sub: "Pennsylvania, 2015 (DVRPC)",
        source:
          "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_CMP_2015/FeatureServer/1",
        queryFields: ["NAME", "WEB_COLOR"]
      },
      "Planning Centers": {
        show: false,
        classifications: new Array(),
        short: "LRP",
        sub: "Connections 2045 Long-Range Plan",
        source:
          "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Connections_2045_Planning_Centers/FeatureServer/0",
        queryFields: ["LUP_TYPE"]
      },
      "Freight Centers": {
        show: false,
        classifications: new Array(),
        short: "Freight",
        sub: null,
        source:
          "https://services1.arcgis.com/LWtWv6q6BJyKidj8/arcgis/rest/services/DVRPC_Connections_2045_Freight_Centers/FeatureServer/0",
        queryFields: ["TYPES"]
      }
    };
  }

  GetClassBreaks = layer => {
    if (layer) {
      if (layer.queryFields.length != 1) {
        let fieldString = "";
        layer.queryFields.map((field, index) => {
          index == 0 ? (fieldString += field + ", ") : (fieldString += field);
        });
        fetch(
          layer.source +
            `/query?where=1%3D1&outFields=${escape(
              fieldString
            )}&returnGeometry=false&returnDistinctValues=true&f=pjson`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(jawn => {
            jawn.features.map((feat, index) => {
              layer.classifications.push([
                feat.attributes.NAME,
                feat.attributes.WEB_COLOR
              ]);
            });
          });
      } else {
        fetch(
          layer.source +
            `/query?where=1%3D1&outFields=${
              layer.queryFields[0]
            }&returnGeometry=false&returnDistinctValues=true&f=pjson`
        )
          .then(response => {
            if (response.ok) {
              return response.json();
            }
          })
          .then(jawn => {
            let field = jawn.fields[0].name;
            jawn.features.map((feat, index) => {
              layer.classifications.push(feat.attributes[field]);
            });
          });
      }
    }
  };

  componentWillMount() {
    let layer = this.state[this.props.data];
    this.GetClassBreaks(layer);
  }
  render() {
    const layer = this.state[this.props.data];
    if (layer) {
      return (
        <div
          className={"legendItem-container"}
          id={`legendItem-${layer.short}`}
        >
          <h2 className={"legendItem-title"}>{this.props.data}</h2>
          <table
            className={"legendItem-content"}
            id={`legendItem-${layer.short}`}
          />
        </div>
      );
    }
  }
}

export default withRouter(Legend);

/*
  buildLegend = layer =>{
    let classifications = {
      "Indicators of Potential Disadvantage": {
        colors: ['ffffd9', 'edf8b1', 'c7e9b4', '7fcdbb', '41b6c4', '1d91c0', '225ea8', '253494', '081d58']
      },
      "CMP Corridors": [],
      "Connections 2045 Centers":[
        ["Metropolitan Center", "#f26522"],
        ["Metropolitan Subcenter", "#223860"],
        ["Suburban Center", "#0b6d32"],
        ["Town Center", "#729faa"],
        ["Rural Center", "#ed1c24"],
        ["Planned Center", "#9d1d20"]
      ]
    }
    switch(layer){
      case "Indicators of Potential Disadvantage":
        return (
          <div className={"legendItem-container"} id={"legendItem-"+this.state.layers[layer].short}>
            <h2 className="legendItem-title">{layer}</h2>
            <table className="legendItem-content" id="legendContent-ipd">
              <tr>
                {classifications[layer].colors.map((color, index)=>{
                  let allColors = classifications[layer].colors
                  let length = allColors.length
                  let w = 100/classifications[layer].colors.length
                  switch(index){
                    case 0:
                      return <td style={"width: "+(w)+"%; color: #"+(allColors[length-1])+"; background-color: #"+(color)}>0</td>
                      break;
                    case length-1:
                      return <td style={"width: "+(w)+"%; color: #"+(allColors[0])+"; background-color: #"+(color)}>36</td>
                      break;
                    default:
                        return <td style={"width: "+(w)+"%; background-color: #"+(color)}></td>
                        break;
                  }
                })}              
              </tr>
            </table>
          </div>
        )
        break;
      case "CMP Corridors":
        // get all PA CMP classifications and build ref object to pull correct names/colors
        fetch('https://services1.arcgis.com/LWtWv6q6BJyKidj8/ArcGIS/rest/services/DVRPC_CMP_2015/FeatureServer/1/query?where=1%3d1&returnGeometry=false&outFields=WEB_COLOR%2C+NAME&returnDistinctValues=true&f=pjson&')
        .then(rawJawn=>{
          if (rawJawn.ok){ return rawJawn.json()}
        })
        .then(colorJawn=>{
          colorJawn.features.forEach(feat=>{
            classifications[layer].push([feat.attributes.WEB_COLOR, feat.attributes.NAME])
          })
        })
        return (
          <div className={"legendItem-container"} id={"legendItem-"+(this.state.layers[layer].short)}>
            <h2 className="legendItem-title">{layer}</h2>
            <table className="legendItem-content" id="legendContent-cmp">
              {}
            </table>
          </div>
        )
        break;
      case "Connections 2045 Centers":
        return(
          <div className={"legendItem-container"} id={"legendItem-"+(this.state.layers[layer].short)}>
            <h2 className="legendItem-title">{layer}</h2>
            <table className="legendItem-content" id="legendContent-lrp">
                {classifications[layer].map((key, index)=>{
                  return (
                  <tr>
                    <td style={{backgroundColor: key[1], width: '2rem'}}></td>
                    <td>{key[0]}</td>
                  </tr>
                  )
                })}
            </table>
          </div>
        )
        break;
      default:
        return <h3 style="display: none;">butts</h3>
    }
  }
*/
