import Inferno from 'inferno'
import Component from 'inferno-component'
import './Map.css'
import mapboxgl from 'mapbox-gl'

class MapComponent extends Component {

    componentDidMount(){
        mapboxgl.accessToken = 'pk.eyJ1IjoibW1vbHRhIiwiYSI6ImNqZDBkMDZhYjJ6YzczNHJ4cno5eTcydnMifQ.RJNJ7s7hBfrJITOBZBdcOA'
        this.map = new mapboxgl.Map({
            container: this.tipMap,
            //TODO: look into why the width is so whack
            style: 'mapbox://styles/mapbox/streets-v9',
            center: [-75.2273, 40.071],
            zoom: 8.82
        })
    }

    componentWillUnmount(){
        this.map.remove()
    }

	render(){
		return(
            <div className="map" ref={e => this.tipMap = e} />
		)
	}
}

export default MapComponent