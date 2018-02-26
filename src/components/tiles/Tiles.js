import Inferno, { Component, linkEvent } from "inferno";

import "./Tiles.css";
import Modal from "../modal/Modal.js";
import { geometryColorType } from "../../utils/tileGeometryColorType.js";

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
    //TODO: call geometryColorType w/geometry data once it gets added to the API response

    //TODO: replace this API key with a process.ENV secret
    /*    const background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${
      this.state.width
    }x${this.state.height}&maptype=hybrid${path}`;*/
    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickModal)}
        /*style={`background: url(${background})`}*/
      >
        {this.props.data && this.state.modalClicked ? (
          <Modal title={this.props.data.road_name} id={this.props.data.id} />
        ) : null}
        <div className="tile-caption">
          <h2 className="tile-caption-text">{this.props.data.road_name}</h2>
          <small className="tile-caption-text">
            AQ Code: {this.props.data.aq_code}
          </small>
          <p className="tile-caption-text">
            {this.props.data.county} County, PA
          </p>
        </div>
        <a href="#" class="tile-link" />
      </div>
    );
  }
}

export default Tile;
