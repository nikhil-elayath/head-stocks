import { GET_INDICES_BYID, OHLC_CHART_INDEX, OHLC_INDICES_DATA } from "./Types";
import axios from "axios";
import { startLoading, stopLoading } from "./LoadingAction";
const url = "http://localhost:2001/api/indicesprofile/";

// GET all companies- Bhavana
export const getIndicesById = index => dispatch => {
  return axios
    .get(url + "singleindex/" + index)
    .then(res => {
      dispatch({
        type: GET_INDICES_BYID,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const getOhlcIndicesById = (index, range) => dispatch => {
  console.log(range);
  return axios
    .post(url + "ohlcdata/" + index, range)
    .then(res => {
      dispatch({
        type: OHLC_INDICES_DATA,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// Fetching OHLC Chart for company
export const getOhlcChartIndex = id => dispatch => {
  dispatch(startLoading());
  try {
    return axios.get("http://localhost:5000/ohlcindices/" + id).then(res => {
      dispatch(stopLoading());
      dispatch({
        type: OHLC_CHART_INDEX,

        payload: res.data
      });
    });
  } catch (err) {
    dispatch(startLoading());
    console.log(err);
  }
};
