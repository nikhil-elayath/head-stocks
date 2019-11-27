const request = require("supertest");
const app = require("../../index");

describe("Testing for screener search", () => {
  it("(Return data of screener search) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    request(app)
      .post("api/screener/screener")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("company by id recieved");
        done();
      });
  });
  it("(Return data of screener search) should return a status code of 400,the body should be an object,a message in the body,the data should be an object", done => {
    request(app)
      .post("api/screener/screener")
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("company by id recieved");
        done();
      });
  });
});
