const request = require("supertest");
const app = require("../../index");

describe("Testing Stocks API", () => {
  it("(View all stocks) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    request(app)
      .get("/api/sector/company")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved All Companies successfully");
        done();
      });
  });
});
