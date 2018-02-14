import Inferno from 'inferno'
import Component from 'inferno-component'
import Polyline from '@mapbox/polyline'
import './Tiles.css'

class Tile extends Component {
	//TODO: add props, lifecycle hooks, other stuff
    render(){
        let path
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
        return(
			<div className="tile">
				<div class="tile-caption">
                    <small>{this.props.data.properties.MPMS_ID}</small>
                    <h2>{this.props.data.properties.ROAD_NAME}</h2>
                    <p>{this.props.data.properties.CTY} County, PA</p>
                </div>
                <div class="tile-img">
                    <img src={`https://maps.googleapis.com/maps/api/staticmap?key=AIzaSyAvK54P-Pb3skEYDLFVoRnSTLtRyG5GJ6U&size=300x250&maptype=hybrid${path}`} />
                </div>
                <a href="#" class="tile-link"></a>
            </div>
		)
	}
}

export default Tile