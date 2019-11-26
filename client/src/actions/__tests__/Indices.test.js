import * as action from "../Indices";
import {
  GET_INDICES_BYID,
  OHLC_CHART_INDEX,
  OHLC_INDICES_DATA
} from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Indices Action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should return indices by id and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 2307;
    moxios.stubRequest(
      "http://localhost:2001/api/indicesprofile/singleindex/" + id,
      {
        status: 200,
        response: { data: responseOfApi }
      }
    );
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_INDICES_BYID,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getIndicesById(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return indices by id and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 3699;
    moxios.stubRequest(
      "http://localhost:2001/api/indicesprofile/singleindex/" + id,
      {
        status: 400,
        response: { data: responseOfApi }
      }
    );
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.getIndicesById(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return ohlc dat  by id and duration and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 2307;
    let time = { time: "1w" };
    moxios.stubRequest(
      "http://localhost:2001/api/indicesprofile/ohlcdata/" + id,
      time,
      {
        status: 200,
        response: { data: responseOfApi }
      }
    );
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.getOhlcIndicesById(id, time)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return indices by id and return status code of 200 with a message", () => {
    const responseOfApi = {};
    let id = 2307;
    moxios.stubRequest("http://localhost:5000/ohlcindices/" + id, {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        payload: {
          data: {}
        },
        type: "OHLC_CHART_INDEX"
      }
    ];
    return store.dispatch(action.getOhlcChartIndex(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
