import * as action from "../CompanyDetail";
import { COMPANY_DETAIL, COMPANY_DATES_BY_ID } from "../Types";
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

  it("should return all companies and return status code of 200 with a message", () => {
    const responseOfApi = [];
    moxios.stubRequest("http://localhost:2001/api/companydetail/all", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: COMPANY_DETAIL,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getCompanyDetail()).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should return all data of dates and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let id = 9;
    moxios.stubRequest(
      "http://localhost:2001/api/companydetail/financial/" + id,
      {
        status: 200,
        response: { data: responseOfApi }
      }
    );
    const store = mockStore({});
    const expectedResponse = [
      {
        type: COMPANY_DATES_BY_ID,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.getCompanyDatesById(id)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
