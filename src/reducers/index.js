import { combineReducers } from 'redux';
import authReducer from './authReducers';
import traveReducer from './travelReducers';

export default combineReducers({
  auth: authReducer,
  travel: traveReducer,
});