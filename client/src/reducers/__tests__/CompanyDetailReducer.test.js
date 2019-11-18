import companyDetailReducer from "../CompanyDetailReducer";
import { COMPANY_DETAIL , COMPANY_DATES_BY_ID} from "../../actions/Types";

describe("Testing Company Details Reducer", () => {
  it("should return a state object with user array equal to the payload in the action when the action type is COMOANY_DETAIL (when the returned state is initial state)", () => {
    const action = {
      type: COMPANY_DETAIL,
      payload: [{}, {}, {}]
    };
    const returnedState = companyDetailReducer(undefined, action);
    expect(returnedState).toEqual({ company: [],
      balance_sheet: [],
      ohlc_chart: [],
      similar_company: [],
      dates: [],
      drop_down_data: [],
      gauge1: [],
      gauge2: [],
      monteCarlo1: [],
      monteCarlo2: [],
      assets1: [],
      assets2: [] });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is COMPANY_DATES_BY_ID (when the returned state is initial state)", () => {
    const action = {
      type: COMPANY_DATES_BY_ID,
      payload: [{}, {}, {}]
    };
    const returnedState = companyDetailReducer(undefined, action);
    expect(returnedState).toEqual({ company: [],
      balance_sheet: [],
      ohlc_chart: [],
      similar_company: [],
      dates: [{}, {}, {}],
      drop_down_data: [],
      gauge1: [],
      gauge2: [],
      monteCarlo1: [],
      monteCarlo2: [],
      assets1: [],
      assets2: [] });
  });

  it("should return the initial state object when the action type is not mentioned or doesn't concern the reducer (when the returned state is initial state)", () => {
    let action = {
      payload: [{}, {}, {}]
    };
    action = {
      type: "SOME_TYPE",
      payload: [{}, {}, {}]
    };
    let returnedState = companyDetailReducer(undefined, action);
    expect(returnedState).toEqual({ company: [],
      balance_sheet: [],
      ohlc_chart: [],
      similar_company: [],
      dates: [],
      drop_down_data: [],
      gauge1: [],
      gauge2: [],
      monteCarlo1: [],
      monteCarlo2: [],
      assets1: [],
      assets2: [] });
  });
});
