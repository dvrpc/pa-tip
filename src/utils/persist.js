export default class StateLoader {
  __KEY__ = `__appState-${process.env.INFERNO_APP_VERSION}`;

  loadState() {
    try {
      let serializedState = localStorage.getItem(this.__KEY__);

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
      localStorage.setItem(this.__KEY__, serializedState);
    } catch (err) {}
  }

  clearState(state) {
    localStorage.setItem(this.__KEY__, {});
  }

  initializeState() {
    //delete old caches
    const test = "__appState-";
    Object.keys(localStorage).forEach(
      key =>
        key.substring(0, test.length) === test && localStorage.removeItem(key)
    );

    return {
      //state object
    };
  }
}
