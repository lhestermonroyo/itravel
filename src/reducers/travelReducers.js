import { GET_TRAVEL } from '../constants/travelConstants';
import { ALERT_TOGGLE_SHOW, ALERT_TOGGLE_HIDE } from '../constants/alertConstants';
import { LOADING_TOGGLE_SHOW, LOADING_TOGGLE_HIDE } from '../constants/loadingConstants';

const initialState = {
  travel: [],
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
    case LOADING_TOGGLE_SHOW:
      return {
        ...state,
        loading: true,
      }
    case LOADING_TOGGLE_HIDE:
      return {
        ...state,
        loading: false,
      }
    case GET_TRAVEL:
      console.log(action.payload);
      return {
        ...state,
        travel: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}
