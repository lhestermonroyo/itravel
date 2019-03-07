import axios from 'axios';
import { GET_TRAVELS, GET_TRAVEL_BY_ID, GET_PROMOTER } from '../constants/travelConstants';
import { ALERT_TOGGLE_SHOW, ALERT_TOGGLE_HIDE } from '../constants/alertConstants';
import { LOADING_TOGGLE_SHOW, LOADING_TOGGLE_HIDE } from '../constants/loadingConstants';

export const saveTravel = (travelData, history) => (dispatch) => {
  dispatch(loadingToggleShow());
  const config = {
    headers: {
      "content-type": "multipart/form-data",
    }
  };
  axios
    .post('http://localhost:5000/api/travels', travelData, config)
    .then(res => {
      if(res.data.success) {
        dispatch(loadingToggleHide());
        history.push('/home');
      }
      else {
        dispatch(loadingToggleHide());
        dispatch(alertToggleShow(res.data));
      }
    })
    .catch(err => console.log(err));
}

export const getTravels = () => (dispatch) => {
  dispatch(loadingToggleShow());
  axios
    .get('http://localhost:5000/api/travels')
    .then(res => {
      console.log(res.data);
      dispatch(loadingToggleHide());
      dispatch({
        type: GET_TRAVELS,
        payload: res.data,
      });
    })
    .catch(err => console.log(err));
}

export const getTravelByID = (id) => (dispatch) => {
  dispatch(loadingToggleShow());
  axios
    .get(`http://localhost:5000/api/travels/${id}`)
    .then(res => {
      dispatch(loadingToggleHide());
      dispatch({
        type: GET_TRAVEL_BY_ID,
        payload: res.data,
      })
    })
    .catch(err => console.log(err));
}

export const getPromoter = (userPosted) => (dispatch) => {
  axios
    .get(`http://localhost:5000/api/users/${userPosted}`)
    .then(res => {
      dispatch({
        type: GET_PROMOTER,
        payload: res.data
      })
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

export const loadingToggleShow = () => {
  return {
    type: LOADING_TOGGLE_SHOW,
  };
}

export const loadingToggleHide = () => {
  return {
    type: LOADING_TOGGLE_HIDE,
  }
}