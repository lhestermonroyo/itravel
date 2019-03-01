import { SAVE_TRAVEL } from '../constants/travelConstants';
import { ALERT_TOGGLE_SHOW, ALERT_TOGGLE_HIDE } from '../constants/alertConstants';

const initialState = {
  travel: [],
  newTravel: {},
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
    case SAVE_TRAVEL:
      console.log(action.payload);
      return {
        ...state,
        newTravel: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}
