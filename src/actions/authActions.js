import axios from 'axios';
import setAuthToken from '../utils/setAuthToken';
import jwt_decode from 'jwt-decode';
import { SET_CURRENT_USER } from '../constants/userConstants';
import { ALERT_TOGGLE_SHOW, ALERT_TOGGLE_HIDE } from '../constants/alertConstants';
import { LOADING_TOGGLE_SHOW, LOADING_TOGGLE_HIDE } from '../constants/loadingConstants';

export const saveUser = (userData, history) => (dispatch) => {
  dispatch(loadingToggleShow());
  axios
    .post('http://localhost:5000/api/users', userData)
    .then(res => {
      if(res.data.success) {
        dispatch(loadingToggleHide());
        history.push('/login');
      }
      else {
        dispatch(loadingToggleHide());
        dispatch(alertToggleShow(res.data));
      }
    })
    .catch(err => console.log(err));
};

export const loginUser = (userData) => (dispatch) => {
  dispatch(loadingToggleShow());
  axios
    .post('http://localhost:5000/api/users/login', userData)
    .then(res => {
      const { token } = res.data;
      console.log(token);
      
      if(token) {
        localStorage.setItem('jwtToken', token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
        dispatch(loadingToggleHide());
      }
      else {
        dispatch(alertToggleShow(res.data));
      }
    })
    .catch(err => console.log("Error:", err));
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}));
}

export const setCurrentUser = (decoded) => {
  console.log("Decoded:", decoded);
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};

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