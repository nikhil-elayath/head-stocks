import usersReducer from "../usersReducer";
import { CREATE_USER, LOGIN } from "../../actions/Types";

describe("Testing Users Reducer", () => {
  it("should return a state object with user array equal to the payload in the action when the action type is CREATE_USERS (when the returned state is initial state)", () => {
    const action = {
      type: CREATE_USER
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [] });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is LOGIN (when the returned state is initial state)", () => {
    const action = {
      type: LOGIN
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [] });
  });

  it("should return a state object with user array equal to the payload in the action when the action type is SOME_TYPE (when the returned state is initial state)", () => {
    const action = {
      type: "SOME_TYPE"
    };
    const returnedState = usersReducer(undefined, action);
    expect(returnedState).toEqual({ users: [] });
  });
});
