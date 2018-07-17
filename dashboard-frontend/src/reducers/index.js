import {combineReducers} from 'redux'
import DroneReducer from './DroneReducer'

const allReducers = combineReducers({
  drones: DroneReducer
})

export default allReducers
