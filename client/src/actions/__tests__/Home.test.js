import * as action from "../Home";
import { NEWS_BY_ID, ALL_NEWS } from "../Types";
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
    moxios.stubRequest("http://localhost:2001/api/home/" + new_id, {
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
});
