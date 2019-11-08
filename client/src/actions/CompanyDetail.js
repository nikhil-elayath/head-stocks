import {
  COMPANY_DETAIL,
  // BALANCE_SHEET,
  // CASH_FLOW,
  // PROFIT_AND_LOSS,
  COMPANY_DETAIL_BY_ID,
} from "./Types";
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

//getting company details by id
export const getCompanyDetailById = id => dispatch => {
  console.log("get companydetails by id from actions", id);
  try {
    return axios
      .get("http://localhost:2001/api/companydetail/" + id)
      .then(res => {
        dispatch({
          type: COMPANY_DETAIL_BY_ID,

          payload: res.data.data,
        });
        console.log("from then");
      });
  } catch (err) {
    console.log(err);
  }
};
//getting balance sheet
// export const getBalanceSheet = () => dispatch => {
//   console.log("Balance Sheet");
//   try {
//     return axios
//       .get("http://localhost:2001/api/companydetail/balancesheet")
//       .then(res => {
//         dispatch({
//           type: BALANCE_SHEET,
//           payload: res.data.data,
//         });
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

//getting cashflow
// export const getCashFlow = () => dispatch => {
//   console.log("cash flow from actions");
//   try {
//     return axios
//       .get("http://localhost:2001/api/companydetail/cashflow")
//       .then(res => {
//         dispatch({
//           type: CASH_FLOW,
//           payload: res.data.data,
//         });
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

//getting cashflow by id
// export const getCashFlowById = id => dispatch => {
//   console.log("cash flow from actions", id);
//   try {
//     return axios
//       .get("http://localhost:2001/api/companydetail/cashflow/" + id)
//       .then(res => {
//         dispatch({
//           type: CASH_FLOW,
//           payload: res.data.data,
//         });
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };

//getting profit and loss

// export const getProfitAndLoss = () => dispatch => {
//   console.log(" profit and loss from actions");
//   try {
//     return axios
//       .get("http://localhost:2001/api/companydetail/profitandloss")
//       .then(res => {
//         dispatch({
//           type: PROFIT_AND_LOSS,
//           payload: res.data.data,
//         });
//       });
//   } catch (err) {
//     console.log(err);
//   }
// };
