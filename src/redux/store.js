import { createStore } from 'redux'
import initialStore from './states'
import reducer from './reducer'

const store = createStore(reducer, initialStore)

export default store
