import { GET_INDICES_BYID, OHLC_CHART_INDEX } from "./Types";
import axios from "axios";
import { startLoading, stopLoading } from "./LoadingAction";
const url = "http://localhost:2001/api/indicesprofile/";

// GET all copanes- Bhavana
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
