import Inferno from 'inferno'
import Component from 'inferno-component'
import './Navbar.css'
import dvrpclogo from './dvrpclogo.png'

class Navbar extends Component {
	render(){
		return(
			<div className="navBar">
                <img src={dvrpclogo} alt="logo" />
				<h1> DVRPC PA TIP 2018</h1>
                <form>
                    <input type="textarea" placeholder="Enter Address"></input>
                    <select name="funds"> 
                        <option value="" selected>FUNDS</option>
                        <option value="1">A FUND</option>
                        <option value="2">ANOTHER FUND</option>
                        <option value="3">3RD FUND</option>
                    </select>
                    <select name="category"> 
                        <option value="" selected>CATEGORY</option>
                        <option value="1">A CATEGORY</option>
                        <option value="2">ANOTHER CATEGORY</option>
                        <option value="3">3RD CATEGORY</option>
                    </select>
                    <input type="button" value="SEARCH"></input>
                </form>
            </div>
		)
	}
}

export default Navbar