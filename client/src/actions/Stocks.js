import { GET_ALL_COMPANY } from "./Types";
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
