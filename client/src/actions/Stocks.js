import {
  GET_ALL_COMPANY,
  GET_ALL_SECTORS,
  GET_ALL_INDUSTRIES,
  GAINERS_LOSERS,
  SCREENER_SEARCH,
} from "./Types";
import { startLoading, stopLoading } from "./LoadingAction";
import axios from "axios";
const url = "http://localhost:2001/api/sector/";

// GET all companies
export const getCompany = industry => dispatch => {
  dispatch(startLoading());
  return axios
    .get(url + "companies/" + industry)
    .then(res => {
      dispatch(stopLoading());
      dispatch({
        type: GET_ALL_COMPANY,
        payload: res.data.data,
      });
    })
    .catch(err => {
      dispatch(startLoading());
      console.log(err);
    });
};

// GET all sectors
export const getSectors = () => dispatch => {
  return axios
    .get(url + "companysectors")
    .then(res => {
      dispatch({
        type: GET_ALL_SECTORS,
        payload: res.data.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getIndustries = sector => dispatch => {
  console.log("get industries by sector from actions:", sector);
  return axios
    .get(url + "industries/" + sector)
    .then(res => {
      dispatch({
        type: GET_ALL_INDUSTRIES,
        payload: res.data.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getGainersLosers = sector => dispatch => {
  return axios
    .get(url + "gainers-and-losers/" + sector)
    .then(res => {
      dispatch({
        type: GAINERS_LOSERS,
        payload: res.data.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
// [Nikhil]  get screener search
export const getScreenerSearch = (value1, value2) => dispatch => {
  let values = { value1: value1, value2: value2 };
  console.log("from screener search actions", values);
  return axios
    .post("http://localhost:2001/api/screener/screener", values)
    .then(res => {
      dispatch({
        type: SCREENER_SEARCH,
        payload: res.data.data,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
