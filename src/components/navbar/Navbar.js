import Inferno from 'inferno'
import Component from 'inferno-component'
import './Navbar.css'

class Navbar extends Component {
	//TODO: add props, lifecycle hooks, other stuff
	render(){
		return(
			<div className="navBar">
                <img src="../../../public/imgs/dvrpclogo.png" alt="logo" />
				<h1> DVRPC PA TIP 2018</h1>
                <input type="textarea">Search</input>
                <input type="button">SEARCH</input>
                <h2> I am a dropdown for FUNDS </h2>
                <h2> I am a dropdown for CATEGORY </h2>
			</div>
		)
	}
}

export default Navbar