import { SEARCH_CONTENT } from "./Types";
import axios from "axios";

//getting Search results
export const searchContent = () => dispatch => {
  try {
    return axios
      .get("http://localhost:2001/api/navbar/search")
      .then(res => {
        dispatch({
          type: SEARCH_CONTENT,
          payload: res.data.data,
        });
      });
  } catch (err) {
    console.log(err);
  }
};
