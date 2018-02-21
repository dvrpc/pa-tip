import { createStore } from 'redux';
import getTIP from './components/reducers/getTIPInfo'

const store = createStore(getTIP)

export default store