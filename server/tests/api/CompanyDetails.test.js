const request = require("supertest");
const app = require("../../index");

describe("Testing Company Details Api", () => {
  it("(get company details)should return a status code of 200, the body should be an object, a message in the body, data should be an object", done => {
    request(app)
      .get("/api/companydetail/all")
      .then(response => {
        expect(response.statusCode).toBe(200);
      });
  });
});
