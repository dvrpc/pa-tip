import Inferno from 'inferno'
import Component from 'inferno-component'
import './TilesContainer.css'

import Tile from '../tiles/Tiles.js'
import Footer from '../footer/Footer.js'

class TilesContainer extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="tilesContainer">
				<div className="header">
					<div className="header-content header-head">
						<h1>Pennsylvania TIP Results</h1>
						<p>8 results.</p>
					</div>
					<div className="header-content header-filter">
						<h2 className="active">Buttons</h2>
						<h2>To</h2>
						<h2>Filter</h2>
						<h2>Results</h2>
					</div>
				</div>
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Tile />
				<Footer />
			</div>
		)
	}
}

export default TilesContainer