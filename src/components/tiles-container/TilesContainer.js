import Inferno from 'inferno'
import Component from 'inferno-component'
import './TilesContainer.css'

import Tile from '../tiles/Tiles.js'

class TilesContainer extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="tilesContainer">
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
			</div>
		)
	}
}

export default TilesContainer