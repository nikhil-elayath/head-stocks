import * as action from "../Stocks";
import {
  GET_ALL_COMPANY,
  GET_ALL_SECTORS,
  GET_ALL_INDUSTRIES,
  GAINERS_LOSERS,
  LOADING_START,
  LOADING_STOP
} from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const url = "http://localhost:2001/api/sector/";
const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing the Actions", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should create action with type GET_ALL_SECTORS and the payload should be same as the api response when the response is 200", () => {
    const responseOfApi = [{}, {}, {}];
    moxios.stubRequest(url + "companysectors", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedActions = [
      {
        type: GET_ALL_SECTORS,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getSectors()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("should create action with type GET_ALL_SECTORS and the payload should be same as the api response when the response is 400", () => {
    const responseOfApi = [{}, {}, {}];
    moxios.stubRequest(url + "companysectors", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedActions = [];
    return store.dispatch(action.getSectors()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create action with type GET_ALL_COMPANY and the payload should be same as the api response when the response is 200", () => {
    const responseOfApi = [{}, {}, {}];
    let filter = "sector";
    let type = "Technology";
    moxios.stubRequest(url + "allcompanies/" + filter + "/" + type, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedActions = [
      { type: LOADING_START },
      { type: LOADING_STOP },
      {
        type: GET_ALL_COMPANY,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getCompany(filter, type)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("should create action with type GET_ALL_COMPANY and the payload should be same as the api response when the response is 400", () => {
    const responseOfApi = [{}, {}, {}];
    let filter = "sector";
    let type = "Technology";
    moxios.stubRequest(url + "allcompanies/" + filter + "/" + type, {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedActions = [{ type: LOADING_START }, { type: LOADING_START }];
    return store.dispatch(action.getCompany(filter, type)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create action with type GET_ALL_INDUSTRIES and the payload should be same as the api response when the response is 200", () => {
    const responseOfApi = [{}, {}, {}];
    let sector = "Basic Materials";
    moxios.stubRequest(url + "industries/" + sector, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedActions = [
      {
        type: GET_ALL_INDUSTRIES,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getIndustries(sector)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("should create action with type GET_ALL_INDUSTRIES and the payload should be same as the api response when the response is 400", () => {
    const responseOfApi = [{}, {}, {}];
    let sector = "Basic Material";
    moxios.stubRequest(url + "industries/" + sector, {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedActions = [];
    return store.dispatch(action.getIndustries(sector)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create action with type GAINERS_LOSERS and the payload should be same as the api response when the response is 200", () => {
    const responseOfApi = [{}, {}, {}];
    let sector = "Basic Materials";
    moxios.stubRequest(url + "gainers-and-losers/" + sector, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedActions = [
      {
        type: GAINERS_LOSERS,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getGainersLosers(sector)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
  it("should create action with type GAINERS_LOSERS and the payload should be same as the api response when the response is 400", () => {
    const responseOfApi = [{}, {}, {}];
    let sector = "Basic Material";
    moxios.stubRequest(url + "gainers-and-losers/" + sector, {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedActions = [];
    return store.dispatch(action.getGainersLosers(sector)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
