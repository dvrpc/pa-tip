import Inferno from 'inferno'
import Component from 'inferno-component'
import { linkEvent } from 'inferno'
import Polyline from '@mapbox/polyline'

import './Tiles.css'
import Modal from '../modal/modal.js'

const clickModal = instance => instance.setState({modalClicked: true})

class Tile extends Component {
    constructor(props){
        super(props)
        this.state = {
            height: 300,
            width: 300,
            modalClicked: false
        }
    }
    componentDidMount(){
        const tile = document.querySelector('.tile')
        // TODO: add setState to window resizing like in the analytics dashboard page
        this.setState({
            height: tile.clientHeight,
            width: tile.clientWidth,
        })
    }


    render(){
        let path;
        if (this.props.data.geometry.type === 'LineString') {
            path = `&path=color:0x${this.props.color}ff|weight:8|enc:${Polyline.fromGeoJSON(this.props.data)}`
        }
        else if (this.props.data.geometry.type === 'MultiLineString') {
            path = this.props.data.geometry.coordinates.map(c => `&path=color:0x${this.props.color}ff|weight:8|enc:${Polyline.fromGeoJSON({type:'LineString',coordinates:c})}`).join('')
        }
        else if (this.props.data.geometry.type === 'Point') {
            path = `&markers=color:0x${this.props.color}|${this.props.data.geometry.coordinates[1]},${this.props.data.geometry.coordinates[0]}`
        }
        else if (this.props.data.geometry.type === 'Polygon') {
            path = this.props.data.geometry.coordinates.map(c => `&path=color:0x${this.props.color}ff|fillcolor:0x${this.props.color}66|weight:4|enc:${Polyline.fromGeoJSON({type:'LineString',coordinates:c})}`).join('')
        }
        //TODO: replace this API key with a process.ENV secret
        const background = `https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=${this.state.width}x${this.state.height}&maptype=hybrid${path}`

        //TODO: create a separate component JUST for the module & pass the information as props from tile to module
        return(
    		<div className="tile" onClick={ linkEvent(this, clickModal) } style={`background: url(${background})`}>
                {this.state.modalClicked ? <Modal title={'the title'} text={'this is the text of the modal yay cool wow yes'} /> : null}
                <div className="tile-caption">
                  <h2 className="tile-caption-text">{this.props.data.properties.ROAD_NAME}</h2>
                  <small className="tile-caption-text">AQ Code: {this.props.data.properties.MPMS_ID}</small>
                  <p className="tile-caption-text">{this.props.data.properties.CTY} County, PA</p>
                </div>
                <a href="#" class="tile-link"></a>
            </div>
		)
	}

}

export default Tile