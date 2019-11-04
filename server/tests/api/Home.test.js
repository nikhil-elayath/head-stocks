const request = require("supertest");
const app = require("../../index");

describe("Testing Users API", () => {
  it("(View all news) should return a status code of 200,the body should be an object,a message in the body,the data should be an array", done => {
    request(app)
      .get("/api/home/allnews")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Retrieved all news Successfully");
        done();
      });
  });

  it("(View news of respected  id) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let id = 1;
    request(app)
      .get("/api/home/" + id)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved news Successfully");
        done();
      });
  });
});
