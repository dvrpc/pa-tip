import Inferno, { Component, linkEvent } from "inferno";
import { connect } from "inferno-redux";

import "./Tiles.css";
import Modal from "../modal/Modal.js";
import { geometryColorType } from "../../utils/tileGeometryColorType.js";
import { getFullTIP } from "../reducers/getTIPInfo";

const clickModal = instance => {
  instance.setState({
    modalClicked: true,
    toModal: instance.props.getFullTIP(instance.props.data.id)
  });
};

class Tile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 300,
      width: 300,
      modalClicked: false,
      toModal: []
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
    /*  
    // The following has been refactored to work from utils:

    const path = geometryColorType(this.props.data)
    //TODO: replace this API key with a process.ENV secret
    const background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${
      this.state.width
    }x${this.state.height}&maptype=hybrid${path}`;
    */

    return (
      <div
        className="tile"
        onClick={linkEvent(this, clickModal)}
        /*style={`background: url(${background})`}*/
      >
        {this.props.data && this.state.modalClicked ? <Modal /> : null}
        <div className="tile-caption">
          <h2 className="tile-caption-text">{this.props.data.road_name}</h2>
          <p className="tile-caption-text">
            {this.props.data.county} County, PA
          </p>
        </div>
        <a href="#" class="tile-link" />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getFullTIP: id => dispatch(getFullTIP(id))
  };
};

export default connect(null, mapDispatchToProps)(Tile);
