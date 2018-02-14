import Inferno from 'inferno'
import Component from 'inferno-component'
import './Tiles.css'

class Tile extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="tile">
                <div className="content">
    				<h1> I Am a Project Title</h1>
                    <div className="details">
                        <p><strong>AQ Code: </strong>S19</p>
                        <p><strong>County: </strong>Burlington</p>
                        <p><strong>MCD: </strong>Various</p>
                    </div>
                </div>
            </div>
		)
	}
}

export default Tile