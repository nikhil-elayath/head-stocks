import { SEARCH_CONTENT } from "./Types";
import { UPDATE_COMPANY } from "./Types";

 
import axios from "axios";

//getting Search results
export const searchContent = searchInput => dispatch => {
  try {
    return axios
      .post("http://localhost:2001/api/navbar/search",searchInput)
      .then(res => {
         dispatch({
          type: SEARCH_CONTENT,
          payload: res.data.data
        }
        // ,console.log("action value"),
        // console.log(data)
        );
      });
  } catch (err) {
    dispatch({
      err
    }
    //  console.log(err);
  }
};


//updating a company
// export const updateCompany = data => dispatch => {
//   try {
//     return axios
//       .post("http://localhost:2001/api/navbar/updateCompany",data)
//       .then(res => {
//          dispatch({
//           type: UPDATE_COMPANY,
//           payload: res.data.data
//         }
//         // ,console.log("action value"),
//         // console.log(data)
//         );
//       });
//   } catch (err) {
//      console.log(err);
//   }
// };
