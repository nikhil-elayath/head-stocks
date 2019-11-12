import { SEARCH_CONTENT } from "./Types";
 
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
     console.log(err);
  }
};
