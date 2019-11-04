import { COMPANY_DETAIL } from "./Types";
import axios from "axios";

//getting company details
export const getCompanyDetail = () => dispatch => {
  try {
    return axios
      .get("http://localhost:2001/api/companydetail/all")
      .then(res => {
        dispatch({
          type: COMPANY_DETAIL,
          payload: res.data.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};
