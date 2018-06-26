import axios from 'axios';
import { browserHistory } from 'react-router';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
import { API_URL, CLIENT_ROOT_URL, errorHandler } from './index';
import { AUTH_LOCAL_USER, AUTH_AZURE_USER, AUTH_ERROR, UNAUTH_USER, FORGOT_PASSWORD_REQUEST, RESET_PASSWORD_REQUEST, PROTECTED_TEST } from './types';

//= ===============================
// Authentication actions
//= ===============================
// TO-DO: Add expiration to cookie
export function loginUser({ email, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/login`, { email, password })
    .then((response) => {
      cookie.set('token', response.data.token, { path: '/', maxAge: 6080});
      cookie.set('user', response.data.user, { path: '/', maxAge: 6080 });
      dispatch({ type: AUTH_LOCAL_USER });
      window.location.href = `${CLIENT_ROOT_URL}/portal`;
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

//test openID login
export function oidcLoginUser() {
  axios({
    url: '/api/redirect',
    method: 'get',
  }).
  then((response) => {console.log("sucess: ", response);});
}


export function registerUser({ email, firstName, lastName, address, phone, password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/register`, { email, firstName, lastName, address, phone, password })
    .then((response) => {
      cookie.set('token', response.data.token, { path: '/' });
      cookie.set('user', response.data.user, { path: '/' });
      dispatch({ type: AUTH_LOCAL_USER });
      window.location.href = `${CLIENT_ROOT_URL}/portal`;
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function logoutUser(error) {
  return function (dispatch) {
    dispatch({ type: UNAUTH_USER, payload: error || '' });
    cookie.remove('token', { path: '/' });
    cookie.remove('user', { path: '/' });

    window.location.href = `${CLIENT_ROOT_URL}/portal`;
  };
}

export function getForgotPasswordToken({ email }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/forgot-password`, { email })
    .then((response) => {
      dispatch({
        type: FORGOT_PASSWORD_REQUEST,
        payload: response.data.message,
      });
      browserHistory.push('/login');
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function resetPassword(token, { password }) {
  return function (dispatch) {
    axios.post(`${API_URL}/auth/reset-password/${token}`, { password })
    .then((response) => {
      dispatch({
        type: RESET_PASSWORD_REQUEST,
        payload: response.data.message,
      });
      // Redirect to login page on successful password reset
      browserHistory.push('/login');
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}

export function protectedTest() {
  return function (dispatch) {
    axios.get(`${API_URL}/protected`, {
      headers: { Authorization: cookie.load('token') },
    })
    .then((response) => {
      dispatch({
        type: PROTECTED_TEST,
        payload: response.data.content,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, AUTH_ERROR);
    });
  };
}
