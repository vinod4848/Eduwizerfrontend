import axios from "axios";
import { store } from "../Redux";

// const axios = require('axios');

// Step-1: Create a new Axios instance with a custom config.
// The timeout is set to 10s. If the request takes longer than
// that then the request will be aborted.
const customAxios = axios.create({
  // baseURL: "http://localhost:8081/",
  // baseURL: 'http://65.2.161.63:3000',
  // baseURL: `${process.env.REACT_APP_API_URL}`,
  //baseURL: `http://localhost:8081`,
  //baseURL: `http://65.0.31.159:3000`,
  // baseURL: `https://eduwizer.com/api/`,
  baseURL: `https://eduwizer.com`,
  // baseURL: "http://43.205.237.123",

  timeout: 30000,
});

// Step-2: Create request, response & error handlers
const requestHandler = (request) => {
  // Token will be dynamic so we can use any app-specific way to always
  // fetch the new token before making the call
  if (store.getState().dataReducer.loginData) {
    request.headers.Authorization = `${store.getState().dataReducer.loginData}`;
  }
  return request;
};

const responseHandler = (response) => {
  if (response.status === 401) {
    window.location = "/login";
  }

  return response;
};

const errorHandler = (error) => {
  // if (error.response.status === 401) {
  //   store.dispatch(setLogout());
  // }
  return Promise.reject(
    error?.response?.data?.message || error?.response?.data || error
  );
};

// Step-3: Configure/make use of request & response interceptors from Axios
// Note: You can create one method say configureInterceptors, add below in that,
// export and call it in an init function of the application/page.
customAxios.interceptors.request.use(
  (request) => requestHandler(request),
  (error) => errorHandler(error)
);

customAxios.interceptors.response.use(
  (response) => responseHandler(response),
  (error) => errorHandler(error)
);

// Step-4: Export the newly created Axios instance to be used in different locations.
export default customAxios;
