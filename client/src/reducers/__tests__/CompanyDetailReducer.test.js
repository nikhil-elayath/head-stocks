import companyDetailReducer from "../CompanyDetailReducer";
import { COMPANY_DETAIL } from "../../actions/Types";

describe("Testing Company Details Reducer", () => {
  it("should return a state object with user array equal to the payload in the action when the action type is COMOANY_DETAIL (when the returned state is initial state)", () => {
    const action = {
      type: COMPANY_DETAIL,
      payload: [{}, {}, {}]
    };
    const returnedState = companyDetailReducer(undefined, action);
    expect(returnedState).toEqual({ company: [], balance_sheet: [] });
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
    expect(returnedState).toEqual({ company: [], balance_sheet: [] });
  });
});
