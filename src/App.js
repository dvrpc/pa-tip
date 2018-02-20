import { version } from 'inferno';
import Component from 'inferno-component';
import './registerServiceWorker';
import './App.css';

/* app components */
import Navbar from './components/navbar/Navbar.js'
import AppContainer from './components/app-container/AppContainer.js'
import Homepage from './components/homepage/Homepage.js'

/* FUNCTION pass the address from homepage into appContainer (which will then pass that to tilesContainer, which will make the API call and feed the results of that to Tiles) */
const search = (instance, address) => instance.setState({searched: true, address: 'tbd'})

class App extends Component {
  constructor(){
    super()
    this.state = {
      searched: false,
      address: ''
    }
  }

  render() {
    return (
      <div>
        {this.state.searched ? 
        <div className="App">
          <Navbar />
          <AppContainer />
        </div>
        :
        <Homepage />}
      </div>
    );
  }
}

export default App;