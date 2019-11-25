const request = require("supertest");
const app = require("../../index");

describe("Testing Stocks API", () => {
  it("GET ALL COMPANY should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let filter = "sector";
    let type = "Technology";
    request(app)
      .get("/api/sector/allcompanies/" + filter + "/" + type)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved all Companies Successfully");
        done();
      });
  });

  it("GET ALL COMPANY should return a status code of 400 when the industry given is wrong,the body should be an object,a message in the body,the data should be an object", done => {
    let filter = "industry";
    let type = "Building Materials";
    request(app)
      .get("/api/sector/allcompanies/" + filter + "/" + type)
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("No Company Found");
        done();
      });
  });

  it("GET ALL SECTORS should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    request(app)
      .get("/api/sector/companysectors")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved All Sectors Successfully");
        done();
      });
  });

  it("GET ALL INDUSTRIES should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let sector = "Basic Materials";
    request(app)
      .get("/api/sector/industries/" + sector)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved all Industries Successfully");
        done();
      });
  });

  it("GET GAINERS AND LOSERS should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let sector = "Basic Materials";
    request(app)
      .get("/api/sector/gainers-and-losers/" + sector)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved name of all indexes");
        done();
      });
  });

  it("GET ALL INDUSTRIES should return a status code of 400 when sector is wrong,the body should be an object,a message in the body,the data should be an object", done => {
    let sector = "Basic";
    request(app)
      .get("/api/sector/industries/" + sector)
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("No Industry Found");
        done();
      });
  });

  it("GET GAINERS AND LOSERS should return a status code of 200 when sector is wrong,the body should be an object,a message in the body,the data should be an object", done => {
    let sector = "Basic";
    request(app)
      .get("/api/sector/gainers-and-losers/" + sector)
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("No Data Found");
        done();
      });
  });
});
