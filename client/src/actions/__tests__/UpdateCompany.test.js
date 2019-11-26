import * as action from "../UpdateCompany";
import { UPDATE_COMPANY } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const url = "http://localhost:2001/api/upload/updateCompany/";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Users Action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should get search results ang return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 9;
    let dataFile = new FormData();

    moxios.stubRequest(url + id, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: UPDATE_COMPANY,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.updateCompany(dataFile, id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
  it("should get search results ang return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 0;
    let dataFile = new FormData();

    moxios.stubRequest(url + id, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: UPDATE_COMPANY,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.updateCompany(dataFile, id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should get search results ang return status code of 400 with a message", () => {
    const responseOfApi = [];
    let id = 8795;
    let dataFile = new FormData();

    moxios.stubRequest(url + id, {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.updateCompany(dataFile, id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
