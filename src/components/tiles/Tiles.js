import Inferno, { Component, linkEvent } from "inferno";
import Polyline from "@mapbox/polyline";
import swal from "sweetalert2";

import "./Tiles.css";
import Modal from "../modal/Modal.js";

const clickModal = instance => instance.setState({ modalClicked: true });

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 300,
      width: 300,
      modalClicked: false
    };
  }

  componentDidMount() {
    const tile = document.querySelector(".tile");
    // TODO: add setState to window resizing like in the analytics dashboard page
    this.setState({
      height: tile.clientHeight,
      width: tile.clientWidth
    });
  }

  render() {
    let path;
    if (this.props.data.geometry.type === "LineString") {
      path = `&path=color:0x${
        this.props.color
      }ff|weight:8|enc:${Polyline.fromGeoJSON(this.props.data)}`;
    } else if (this.props.data.geometry.type === "MultiLineString") {
      path = this.props.data.geometry.coordinates
        .map(
          c =>
            `&path=color:0x${
              this.props.color
            }ff|weight:8|enc:${Polyline.fromGeoJSON({
              type: "LineString",
              coordinates: c
            })}`
        )
        .join("");
    } else if (this.props.data.geometry.type === "Point") {
      path = `&markers=color:0x${this.props.color}|${
        this.props.data.geometry.coordinates[1]
      },${this.props.data.geometry.coordinates[0]}`;
    } else if (this.props.data.geometry.type === "Polygon") {
      path = this.props.data.geometry.coordinates
        .map(
          c =>
            `&path=color:0x${this.props.color}ff|fillcolor:0x${
              this.props.color
            }66|weight:4|enc:${Polyline.fromGeoJSON({
              type: "LineString",
              coordinates: c
            })}`
        )
        .join("");
    }
    //TODO: replace this API key with a process.ENV secret
    const background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${
      this.state.width
    }x${this.state.height}&maptype=hybrid${path}`;
    const table =
      "<table><thead><th>Phase</th><th>Fund</th><th>Year</th></thead><tbody><tr><td>CON</td><td>TOLL</td><td>2017</td></tr><tr><td>DRF</td><td>TAU</td><td>2021</td></tr><tr><td>EKL</td><td>NOP</td><td>2029</td></tr></tbody></table>";
    const description =
      "<p>Proin et sapien justo. Pellentesque ligula ligula, eleifend eget quam at, <em>vulputate maximus diam.</em> Mauris consequat dui eget magna efficitur, sit amet lobortis nunc tristique. Donec nec purus in augue commodo euismod eget et urna. <strong>Mauris egestas</strong> nunc aliquam, molestie nunc vitae, euismod nisi. Pellentesque molestie libero lacus, suscipit aliquam metus tempus et. Fusce libero tellus, convallis at leo sit amet, euismod interdum ipsum. Vestibulum ante ipsum primis in faucibus orci <em>luctus et ultrices posuere cubilia</em> Curae; Suspendisse quis vestibulum est, vitae ultricies felis. Donec rutrum libero urna, at <strong>lobortis turpis pulvinar non.</strong> Quisque viverra vulputate rutrum. In dictum in dolor non scelerisque.</p>";
    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickModal)}
        style={`background: url(${background})`}
      >
        {this.state.modalClicked ? (
          <Modal
            title={this.props.data.properties.ROAD_NAME}
            html={`${description} ${table}`}
          />
        ) : null}
        <div className="tile-caption">
          <h2 className="tile-caption-text">
            {this.props.data.properties.ROAD_NAME}
          </h2>
          <small className="tile-caption-text">
            AQ Code: {this.props.data.properties.MPMS_ID}
          </small>
          <p className="tile-caption-text">
            {this.props.data.properties.CTY} County, PA
          </p>
        </div>
        <a href="#" class="tile-link" />
      </div>
    );
  }
}

export default Tile;
