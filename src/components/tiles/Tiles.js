import Inferno from 'inferno'
import Component from 'inferno-component'
import './Tiles.css'

class Tile extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="tile">
				<h1> I am a tile with information</h1>
			</div>
		)
	}
}

export default Tile