import * as action from "../Navbar";
import { SEARCH_CONTENT } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Navbar Action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should get search results ang return status code of 200 with a message", () => {
    const responseOfApi = [];
    let searchString = {
      searchInput: "AAPL"
    };
    moxios.stubRequest("http://localhost:2001/api/navbar/search", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: SEARCH_CONTENT,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.searchContent(searchString)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should get search results ang return status code of 400 with a message", () => {
    const responseOfApi = [];
    let searchString = {
      searchInput: "123456"
    };
    moxios.stubRequest("http://localhost:2001/api/navbar/search", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.searchContent(searchString)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
