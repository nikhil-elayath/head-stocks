import { LOADING_START, LOADING_STOP } from "./Types";

// for start loading [piyush]
export const startLoading = () => {
  return {
    type: LOADING_START
  };
};

// for stop loading [piyush]
export const stopLoading = () => {
  return {
    type: LOADING_STOP
  };
};
