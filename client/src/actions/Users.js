import {
  CREATE_USER,
  LOGIN,
  RESET_PASSWORD,
  SEND_OTP,
  VERIFY_OTP,
  ERROR_TYPE
} from "./Types";
import axios from "axios";
import jwt_decode from "jwt-decode";
const url = "http://localhost:2001/api/users/";

// Create a new user - Bhavana
export const createUser = user => dispatch => {
  return axios
    .post(url + "signup", user)
    .then(res => {
      dispatch({
        type: CREATE_USER,
        payload: res.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        payload: err.response.data.message
      });
    });
};

// Login - Bhavana
export const login = (user, history) => dispatch => {
  return axios
    .post(url + "login", user)
    .then(res => {
      localStorage.setItem("token", res.data.data);

      dispatch({
        type: LOGIN,
        payload: res.data.data
      });
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        payload: err.response.data.message
      });
    });
};

// Reset Password - Bhavana
export const resetPassword = user => dispatch => {
  return axios
    .put(url + "reset_password", user)
    .then(res => {
      dispatch({
        type: RESET_PASSWORD,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Send OTP to verify email - Bhavana
export const sendOtp = user => dispatch => {
  console.log(user);
  return axios
    .post(url + "send_otp", user)
    .then(res => {
      dispatch({
        type: SEND_OTP,
        payload: res.data.data
      });
      console.log(res.data.data);
    })
    .catch(err => {
      dispatch({
        type: ERROR_TYPE,
        payload: err.response.data.message
      });
      console.log(err.response.data.message);
    });
};

// Verify Otp - Bhavana
export const verifyOtp = user => dispatch => {
  return axios
    .post(url + "verify_otp", user)
    .then(res => {
      dispatch({
        type: VERIFY_OTP,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
