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

  // Harshal
  // testing the financials Reports/tables data
  it("(Returns Reports data) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let id = 9;
    request(app)
      .get("/api/financial/" + id)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved dates Successfully");
        done();
      });
  });
  it("(Does not Return Reports data) should return a status code of 400,the body should be an object,a message in the body,the data should be an object", done => {
    let id = 0;
    request(app)
      .get("/api/financial/" + id)
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        // expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("No Dates Found");
        done();
      });
  });

  it("(Returns Reports data) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let id = 9;
    request(app)
      .post("/api/dropdown")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe(
          "Similar companies for dropdown retrieved"
        );
        done();
      });
  });

  //analysis
  it("(Returns Reports data) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    request(app)
      .post("/api/analysis")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe(
          "Similar companies for dropdown retrieved"
        );
        done();
      });
  });
});
