import * as action from "../Home";
import {
  NEWS_BY_ID,
  ALL_NEWS,
  GET_ALL_INDICES,
  LOADING_START,
  LOADING_STOP
} from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Home Action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("shouldreturn all news and return status code of 200 with a message", () => {
    const responseOfApi = [];
    moxios.stubRequest("http://localhost:2001/api/home/allnews", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: ALL_NEWS,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.allNews()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return a single news by id and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let new_id = 1;
    moxios.stubRequest("http://localhost:2001/api/home/singleNews/" + new_id, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: NEWS_BY_ID,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.newsById(new_id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return a al the index and return status code of 200 with a message", () => {
    const responseOfApi = [];

    moxios.stubRequest("http://localhost:2001/api/home/index", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: LOADING_START
      },
      {
        type: LOADING_STOP
      },
      {
        type: GET_ALL_INDICES,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getIndices()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
