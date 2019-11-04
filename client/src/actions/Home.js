import { ALL_NEWS, NEWS_BY_ID } from "./Types";
import axios from "axios";
const url = "http://localhost:2001/api/home/";

// get all news - piyush
export const allNews = () => dispatch => {
  return axios
    .post(url + "allnews")
    .then(res => {
      dispatch({
        type: ALL_NEWS,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};

// get all news - piyush
export const newsById = news_id => dispatch => {
  return axios
    .post(url + news_id)
    .then(res => {
      dispatch({
        type: NEWS_BY_ID,
        payload: res.data.data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
