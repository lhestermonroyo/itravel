import axios from 'axios';
import { SAVE_TRAVEL } from '../constants/travelConstants';
import { ALERT_TOGGLE_SHOW, ALERT_TOGGLE_HIDE } from '../constants/alertConstants';

export const saveTravel = (travelData, history) => (dispatch) => {
  console.log(travelData);
  console.log(history);
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    }
  };
  axios
    .post('http://localhost:5000/api/travels', travelData, config)
    .then(res => {
      if(res.data.success) {
        history.push('/home');
      }
      else {
        dispatch(alertToggleShow(res.data));
      }
    })
    .catch(err => console.log(err));
}

export const alertToggleShow = (data) => {
  return {
    type: ALERT_TOGGLE_SHOW,
    payload: data,
  };
}

export const alertToggleHide = () => {
  return {
    type: ALERT_TOGGLE_HIDE,
  }
}