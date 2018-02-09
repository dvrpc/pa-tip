import Inferno from 'inferno'
import Component from 'inferno-component'
import './TilesContainer.css'

class TilesContainer extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="tilesContainer">
				<h1> I will become a container for all of the tiles in the app I am 60% width</h1>
			</div>
		)
	}
}

export default TilesContainer