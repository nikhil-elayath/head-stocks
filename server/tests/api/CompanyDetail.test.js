const request = require("supertest");
const app = require("../../index");

describe("Testing ComapnyDetail API", () => {
  it("(Return data of company specified) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let id = 1;
    request(app)
      .get("/api/companydetail/" + id)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("company by id recieved");
        done();
      });
  });

  it("(Doud not Return data of company specified) should return a status code of 400,the body should be an object,a message in the body,the data should be an object", done => {
    let id = 7894;
    request(app)
      .get("/api/companydetail/" + id)
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("No companies found");
        done();
      });
  });
});
