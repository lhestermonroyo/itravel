import { SET_CURRENT_USER } from '../constants/userConstants';
import { ALERT_TOGGLE_SHOW, ALERT_TOGGLE_HIDE } from '../constants/alertConstants';
const isEmpty = require('is-empty');
const initialState = {
  isAuthenticated: false,
  user: {},
  loading: false,
  alertToggle: false,
  alertMessage: '',
  alertType: null,
};

export default function(state = initialState, action) {
  switch(action.type) {
    case ALERT_TOGGLE_SHOW: 
      console.log(action.payload);
      return {
        ...state,
        alertToggle: true,
        alertMessage: action.payload.message,
        alertType: action.payload.type,
      }
    case ALERT_TOGGLE_HIDE:
      return {
        ...state,
        alertToggle: false,
      }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}
