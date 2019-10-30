import * as action from "../Users";
import { CREATE_USER, LOGIN } from "../Types";
import moxios from "moxios";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe("Testing Users Action", () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it("should create a new user and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let user = {
      name: "Piyush Gupta",
      email: "guptapiyush@gmail.com",
      phone: "8529637412",
      password: "piyush03"
    };
    moxios.stubRequest("http://localhost:2001/api/users/signup", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: CREATE_USER,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.createUser(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should not create a new user if any one of the field is empty and return status code of 400 with a message", () => {
    const responseOfApi = [{}, {}];
    let user = {
      name: "",
      email: "guptapiyush@gmail.com",
      phone: "8529637412",
      password: "piyush03"
    };
    moxios.stubRequest("http://localhost:2001/api/users/signup", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.createUser(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should login a user successfully and return status code of 200 with a message", () => {
    const responseOfApi = [];
    let user = {
      email: "guptapiyush@gmail.com",
      password: "piyush03"
    };
    moxios.stubRequest("http://localhost:2001/api/users/login", {
      status: 200,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [
      {
        type: LOGIN,
        payload: responseOfApi
      }
    ];
    return store.dispatch(action.login(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });

  it("should not login a user if the credentials don't match and return status code of 400 with a message", () => {
    const responseOfApi = [{}, {}];
    let user = {
      email: "guptapiyush@gmail.com",
      password: "piyush"
    };
    moxios.stubRequest("http://localhost:2001/api/users/login", {
      status: 400,
      response: { data: responseOfApi }
    });
    const store = mockStore({});
    const expectedResponse = [];
    return store.dispatch(action.login(user)).then(() => {
      expect(store.getActions()).toEqual(expectedResponse);
    });
  });
});
