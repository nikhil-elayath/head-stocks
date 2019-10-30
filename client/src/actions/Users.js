import { CREATE_USER, LOGIN } from "./Types";
import axios from "axios";
const url = "http://localhost:2001/api/users/";

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
      console.log(err);
    });
};

export const login = user => dispatch => {
  return axios
    .post(url + "login", user)
    .then(res => {
      dispatch({
        type: LOGIN,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
