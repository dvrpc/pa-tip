//TODO for deployment: change the localStorage.getItem URL to the live site
export default class StateLoader {
  loadState() {
    try {
      let serializedState = localStorage.getItem("http://localhost:3000:state");

      if (serializedState === null) {
        return this.initializeState();
      }

      return JSON.parse(serializedState);
    } catch (err) {
      return this.initializeState();
    }
  }

  saveState(state) {
    try {
      let serializedState = JSON.stringify(state);
      localStorage.setItem("http://localhost:3000:state", serializedState);
    } catch (err) {}
  }

  initializeState() {
    return {
      //state object
    };
  }
}
