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
                <form>
                    <input type="textarea" placeholder="Find your TIP"></input>
                    <select name="funds"> 
                        <option selected disabled hidden>FUNDS</option>
                        <option>A FUND</option>
                        <option>ANOTHER FUND</option>
                        <option>3RD FUND</option>
                    </select>
                    <select name="category"> 
                        <option selected disabled hidden>CATEGORY</option>
                        <option>A CATEGORY</option>
                        <option>ANOTHER CATEGORY</option>
                        <option>3RD CATEGORY</option>
                    </select>
                    <input type="button" value="SEARCH"></input>
                </form>
            </div>
		)
	}
}

export default Navbar