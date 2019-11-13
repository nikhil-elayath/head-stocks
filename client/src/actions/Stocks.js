import { GET_ALL_COMPANY, GET_ALL_SECTORS, GET_ALL_INDUSTRIES } from "./Types";
import axios from "axios";
const url = "http://localhost:2001/api/sector/";

// GET all companies
export const getCompany = () => dispatch => {
  return axios
    .get(url + "company")
    .then(res => {
      dispatch({
        type: GET_ALL_COMPANY,
        payload: res.data.data
      });
    })
    .catch(err => {
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
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// GET all industries
export const getIndustries = sector => dispatch => {
  console.log("get industries by sector from actions:", sector);
  return axios
    .get(url + "industries/" + sector)
    .then(res => {
      dispatch({
        type: GET_ALL_INDUSTRIES,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
