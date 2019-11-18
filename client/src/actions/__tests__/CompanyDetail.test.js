import * as action from "../CompanyDetail";
import {
  COMPANY_DETAIL,
  COMPANY_DATES_BY_ID,
  GET_DROP_DOWN,
  GET_SIMILAR_TABLE,
  GET_ALL_INDICES,
  OHLC_CHART,
  GET_GAUGE_COMPANY1,
  GET_GAUGE_COMPANY2,
  MONTECARLO_COMPANY1,
  MONTECARLO_COMPANY2,
  ASSETS_COMPANY1,
  ASSETS_COMPANY2,
  COMPANY_DETAIL_BY_ID,
} from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Company Detail Action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  //nikhil
  it("should return all companies and return status code of 200 with a message", () => {
    const responseOfApi = [];
    moxios.stubRequest("http://localhost:2001/api/companydetail/all", {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: COMPANY_DETAIL,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getCompanyDetail()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  //harshal
  it("should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 9;
    moxios.stubRequest(
      "http://localhost:2001/api/companydetail/financial/" + id,
      {
        status: 200,
        response: { data: responseOfApi },
      }
    );
    const store = mockStore({});
    const expectedResponse = [
      {
        type: COMPANY_DATES_BY_ID,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getCompanyDatesById(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  //nikhil
  it("(drop down)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let sector = "Technology";
    moxios.stubRequest("http://localhost:2001/api/dropdown", {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_DROP_DOWN,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getDropDownData(sector)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("(similar table)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let sector = "Technology";
    moxios.stubRequest("http://localhost:2001/api/analysis/analysis", {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_SIMILAR_TABLE,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getSimilarTable(sector)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  //ohlc
  it("(ohlc chart)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 1;
    moxios.stubRequest("http://localhost:5000/companyindices/" + id, {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: OHLC_CHART,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getOhlcChart(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  // download data
  it("(ohlc chart)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let ohlc = 1;
    moxios.stubRequest(
      "http://localhost:2001/api/companydetail/downloadohlc/" + ohlc,
      {
        status: 200,
        response: { data: responseOfApi },
      }
    );
    const store = mockStore({});
    const expectedResponse = [
      {
        // type: OHLC_CHART,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.downloadOhlcDataCompany(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  // Gauge for Company1
  it("(GET_GAUGE_COMPANY1)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let ticker = "AAPL";
    moxios.stubRequest("http://localhost:5000/gaugeCompany1/" + ticker, {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_GAUGE_COMPANY1,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getGaugeCompany1(ticker)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  // Gauge for Company2

  it("(GET_GAUGE_COMPANY2)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let ticker = "AAPL";
    moxios.stubRequest("http://localhost:5000/gaugeCompany2/" + ticker, {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: GET_GAUGE_COMPANY2,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getGaugeCompany2(ticker)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  // getmonteCarloCompany1
  it("(drop down)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let ticker = "AAPL";
    moxios.stubRequest("http://localhost:5000/monteCarloCompany1/" + ticker, {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: MONTECARLO_COMPANY1,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getmonteCarloCompany1(ticker)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  //monte carlo 2

  it("(drop down)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let ticker = "AAPL";
    moxios.stubRequest("http://localhost:5000/monteCarloCompany2/" + ticker, {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: MONTECARLO_COMPANY2,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getmonteCarloCompany2(ticker)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  //getAssetsCompany1

  it("(drop down)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let ticker = "AAPL";
    moxios.stubRequest("http://localhost:5000/assetsCompany1/" + ticker, {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: ASSETS_COMPANY1,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getAssetsCompany1(ticker)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  //assests 2

  it("(drop down)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let ticker = "AAPL";
    moxios.stubRequest("http://localhost:5000/assetsCompany2/" + ticker, {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: ASSETS_COMPANY2,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getAssetsCompany2(ticker)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
  //getCompanyDetailById

  it("(drop down)should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 1;
    moxios.stubRequest("http://localhost:2001/api/companydetail/" + id, {
      status: 200,
      response: { data: responseOfApi },
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: COMPANY_DETAIL_BY_ID,
        payload: responseOfApi,
      },
    ];
    return store.dispatch(action.getCompanyDetailById(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
