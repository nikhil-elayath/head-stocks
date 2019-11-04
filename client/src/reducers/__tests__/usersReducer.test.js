import usersReducer from "../usersReducer";
import {
  CREATE_USER,
  LOGIN,
  RESET_PASSWORD,
  SEND_OTP,
  VERIFY_OTP,
  ERROR_TYPE
} from "../../actions/Types";

describe("Testing Users Reducer", () => {
  it("should return a state object with user array equal to the payload in the action when the action type is CREATE_USERS (when the returned state is initial state)", () => {
    const action = {
      type: CREATE_USER
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [], error: "" });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is LOGIN (when the returned state is initial state)", () => {
    const action = {
      type: LOGIN
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [], error: "" });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is SOME_TYPE (when the returned state is initial state)", () => {
    const action = {
      type: "SOME_TYPE"
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [], error: "" });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is RESET_PASSWORD (when the returned state is initial state)", () => {
    const action = {
      type: RESET_PASSWORD
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [], error: "" });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is SEND_OTP (when the returned state is initial state)", () => {
    const action = {
      type: SEND_OTP
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [], error: "" });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is VERIFY_OTP (when the returned state is initial state)", () => {
    const action = {
      type: VERIFY_OTP
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [], error: "" });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is ERROR_TYPE (when the returned state is initial state)", () => {
    const action = {
      type: ERROR_TYPE
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ error: undefined, users: [] });
  });
});
