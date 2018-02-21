import Inferno from 'inferno';
import Component from 'inferno-component';

import './Homepage.css'

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="banner">
          <h1>A cool logo will be made for this</h1>
        </div>
        <form id="search-form">
          <h1>Search TIP Projects by Location</h1>
          <input type="text" placeholder="Enter a municipality, city, zip code or Philadelphia neighborhood" />
        </form>
      </div>
    );
  }
}

export default Homepage;