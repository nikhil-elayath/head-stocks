import {
  COMPANY_DETAIL,
  COMPANY_DETAIL_BY_ID,
  COMPANY_DATES_BY_ID,
  OHLC_CHART,
  GET_SIMILAR_TABLE
} from "./Types";
import { startLoading, stopLoading } from "./LoadingAction";
import axios from "axios";

// getting company details
export const getCompanyDetail = () => dispatch => {
  try {
    return axios
      .get("http://localhost:2001/api/companydetail/all")
      .then(res => {
        dispatch({
          type: COMPANY_DETAIL,
          payload: res.data.data
        });
      });
  } catch (err) {
    console.log(err);
  }
};

// getting company details by id
export const getCompanyDetailById = id => dispatch => {
  console.log("get companydetails by id from actions", id);
  try {
    return axios
      .get("http://localhost:2001/api/companydetail/" + id)
      .then(res => {
        dispatch({
          type: COMPANY_DETAIL_BY_ID,
          payload: res.data.data
        });
        console.log(res.data.data.result.sector);
        let sector = {
          sector: res.data.data.result.sector
        };
        console.log("obj sector from action", sector);
        dispatch(getSimilarTable(sector));
        console.log("from then");
      });
  } catch (err) {
    console.log(err);
  }
};

//getting analysis
export const getSimilarTable = sector => dispatch => {
  // const sector = requset.body.sector;
  console.log("get analysis by id from actions", sector);
  try {
    return axios
      .post("http://localhost:2001/api/analysis/analysis", sector)
      .then(res => {
        dispatch({
          type: GET_SIMILAR_TABLE,

          payload: res.data.data
        });
        console.log("from then of similar table");
      });
  } catch (err) {
    console.log(err);
  }
};

// Fetching OHLC Chart for company [Bhavana]
export const getOhlcChart = id => dispatch => {
  dispatch(startLoading());
  try {
    return axios.get("http://localhost:5000/companyindices/" + id).then(res => {
      dispatch(stopLoading());
      dispatch({
        type: OHLC_CHART,

        payload: res.data
      });
    });
  } catch (err) {
    dispatch(startLoading());
    console.log(err);
  }
};

// downloading ohlc data for company[piyush]

export const downloadOhlcDataCompany = ohlc => {
  try {
    return axios.get(
      "http://localhost:2001/api/companydetail/downloadohlc/" + ohlc
    );
  } catch (err) {
    console.log(err);
  }
};

// getting company dates by id
export const getCompanyDatesById = id => dispatch => {
  // console.log("get companydetails by id from actions", id);
  try {
    return axios
      .get("http://localhost:2001/api/companydetail/financial/" + id)
      .then(res => {
        dispatch({
          type: COMPANY_DATES_BY_ID,
          payload: res.data.data
        });
        //  let sector = {
        //   sector: res.data.data.result.sector
        // };
        //  dispatch(getSimilarTable(sector));
      });
  } catch (err) {
    console.log(err);
  }
};
