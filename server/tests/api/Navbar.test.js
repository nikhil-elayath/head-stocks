const request = require("supertest");
const app = require("../../index");

describe("Testing IndicesProfile API", () => {
  it("(View indices of respected  id) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let searchInput = "AA";
    let payload = JSON.stringify(searchInput);
    request(app)
      .post("/api/navbar/search")
      .send(payload)
      .set("Content-type", "application/json")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved Indices successfully");
        done();
      });
  });
});
