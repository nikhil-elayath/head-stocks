import { GET_ALL_COMPANY, GAINERS_LOSERS } from "./Types";
import axios from "axios";
const url = "http://localhost:2001/api/sector/";

// GET all copanes- Bhavana
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

export const getGainersLosers = sector => dispatch => {
  return axios
    .get(url + "gainers-and-losers/" + sector)
    .then(res => {
      dispatch({
        type: GAINERS_LOSERS,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
