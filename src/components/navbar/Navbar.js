import Inferno from 'inferno'
import Component from 'inferno-component'
import './Navbar.css'

class Navbar extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="navBar">
				<h1> hello I am a navbar</h1>
			</div>
		)
	}
}

export default Navbar