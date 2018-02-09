import Inferno from 'inferno'
import Component from 'inferno-component'
import './AppContainer.css'

import MapComponent from '../map/Map.js'
import TilesContainer from '../tiles-container/TilesContainer.js'

class AppContainer extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="appContainer">
				<MapComponent />
				<TilesContainer />
			</div>
		)
	}
}

export default AppContainer