import { version } from 'inferno';
import Component from 'inferno-component';
import './registerServiceWorker';
import './App.css';

/* app components */
import Navbar from './components/navbar/Navbar.js'
import AppContainer from './components/app-container/AppContainer.js'
import Footer from './components/footer/Footer.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <AppContainer />
        <Footer />
      </div>
    );
  }
}

export default App;