import axios from 'axios';
import Cookies from 'universal-cookie';
const cookie = new Cookies();
import { logoutUser } from './auth';
import { STATIC_ERROR, FETCH_USER, FETCH_PAGE_DATA, LOAD_CHECKLIST, GET_ALL_TASKS, CHANGE_STATUS, ERROR_RESPONSE, POST_DATA, AUTH_LOCAL_USER, AUTH_AZURE_USER } from './types';
import { fetchData } from "../data/mockDataAPI";
const SITE_DATA_PATH = '../data/cleanSiteData.json'
export const API_URL = '/api'; 
export const COSMOS_EMU_URL = 'https://localhost:8081';// cosmos db emulator URL
export const CLIENT_ROOT_URL = '';

//= ===============================
// Utility actions
//= ===============================
export function fetchUser(uid) {
  return function (dispatch) {
    const thisToken = cookie.get('token')
    axios.get(`${API_URL}/user/${uid}`, { 
      headers: { Authorization: thisToken }, 
    })
    .then((response) => {
      dispatch({
        type: FETCH_USER,
        payload: response.data.user,
      });
    })
    .catch((error) => dispatch(errorHandler(dispatch, error.response, ERROR_RESPONSE)));
  };
}

export function fetchAzureUser() {
  return function (dispatch) {
    axios.get(`${API_URL}/azure-user`)
    .then((response) => {
      console.log('promise called first time. Response: ', response);      
      dispatch({
        type: FETCH_USER,
        payload: response.data.user,
      });
    })
    .then(() => {
      console.log('promise called second time');
      dispatch({ type: AUTH_AZURE_USER });
      dispatch({ type: 'FETCH_USER_RECEIVED' });
    })
    .catch((error) => dispatch(errorHandler(dispatch, error.response, ERROR_RESPONSE)));
  };
}

// load page data from local file
export function loadPageData() {  
  return dispatch => {
    axios.get('./smallClaimsData.json')
      .then(data => {
      console.log('action', data)
      dispatch({
          type : FETCH_PAGE_DATA,
          payload : data
      })
    })
  }
}

// todo component actions from todo redux basics tutorial
let nextTodoId = 0
export const addTodo = (text) => {
  return {
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
  }
}

export const setVisibilityFilter = (filter) => {
  return {
    type: 'SET_VISIBILITY_FILTER',
    filter
  }
}

export const toggleTodo = (id) => {
  return {
    type: 'TOGGLE_TODO',
    id
  }
}

export const accordionTodo = (id) => {
  return {
    type: 'ACCORDION_TODO',
    id
  }
}

// checklist add case
export const addUserCase = (caseType) => {
  return {
    type: 'ADD_CASE',
    caseType
  }
}

export function errorHandler(dispatch, error, type) {
  console.log('Error type: ', type);
  console.log(error);

  let errorMessage = error.response ? error.response.data : error;

   // NOT AUTHENTICATED ERROR
  if (error.status === 401 || error.response.status === 401) {
    errorMessage = 'You are not authorized to do this.';
    return dispatch(logoutUser(errorMessage));
  }

  dispatch({
    type,
    payload: errorMessage,
  });
}

// Post Request
export function postData(action, errorType, isAuthReq, url, dispatch, data) {
  console.log("URL: ", url);
  console.log("Data: ", data);
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.get('token') } };
  }

  axios.post(requestUrl, data, headers)
  .then((response) => {
    console.log("Repsonse Received: ", response.data);
    dispatch({
      type: action,
      payload: response.data.payload,
    });
    
  })
  .catch((error) => {
    console.log("Error", error);
    errorHandler(dispatch, error.response, errorType);
  });
}

// Get Request
export function getData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.get('token') } };
  }

  axios.get(requestUrl, headers)
  .then((response) => {
    console.log("Response.Data: ", response.data);
    console.log("Action type: ", action);
    dispatch({
      type: action,
      payload: response.data.payload,
    });
  })
  .catch((error) => {
    console.log("error handler is invoked");
    errorHandler(dispatch, error.response, errorType);
  });
}

// Put Request
export function putData(action, errorType, isAuthReq, url, dispatch, data) {
  const requestUrl = API_URL + url;
  let headers = {};
  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.get('token') } };
  }
  axios.put(requestUrl, data, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}

// Delete Request
export function deleteData(action, errorType, isAuthReq, url, dispatch) {
  const requestUrl = API_URL + url;
  let headers = {};

  if (isAuthReq) {
    headers = { headers: { Authorization: cookie.get('token') } };
  }

  axios.delete(requestUrl, headers)
  .then((response) => {
    dispatch({
      type: action,
      payload: response.data.payload,
    });
  })
  .catch((error) => {
    errorHandler(dispatch, error.response, errorType);
  });
}

//= ===============================
// Static Page actions
//= ===============================
export function sendContactForm({ name, emailAddress, message }) {
  return function (dispatch) {
    axios.post(`${API_URL}/communication/contact`, { name, emailAddress, message })
    .then((response) => {
      dispatch({
        type: SEND_CONTACT_FORM,
        payload: response.data.message,
      });
    })
    .catch((error) => {
      errorHandler(dispatch, error.response, STATIC_ERROR);
    });
  };
}