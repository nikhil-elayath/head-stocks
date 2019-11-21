const request = require("supertest");
const app = require("../../index");

describe("Testing for screener search", () => {
  it("should return a status code of 200, body should be an object, data should be an object and message should be as provided", done => {
    request(app)
      .get("/screener")
      .then(res => {
        expect(res.data).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Screened Search Recieved");
        done();
      });
  });
});
