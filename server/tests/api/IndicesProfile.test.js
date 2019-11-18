const request = require("supertest");
const app = require("../../index");

describe("Testing IndicesProfile API", () => {
  it("(View indices of respected  id) should return a status code of 200,the body should be an object,a message in the body,the data should be an object", done => {
    let id = 2307;
    request(app)
      .get("/api/indicesprofile/singleindex/" + id)
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved Indices successfully");
        done();
      });
  });

  it("(Should not return on wron gid) should return a status code of 400,a message in the body,the data should be an object", done => {
    let id = 3211;
    request(app)
      .get("/api/indicesprofile/singleindex/" + id)
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("No Indices Found");
        done();
      });
  });

  it("(Should return OHLC Data) should return a status code of 400,a message in the body,the data should be an object", done => {
    let id = 2307;
    let time = {
      time: "1w"
    };
    let payload = JSON.stringify(time);
    request(app)
      .post("/api/indicesprofile/ohlcdata/" + id)
      .send(payload)
      .set("Content-type", "application/json")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved Data successfully");
        done();
      });
  });

  it("(Should return OHLC Data) should return a status code of 400,a message in the body,the data should be an object", done => {
    let id = 2307;
    let time = {
      time: "1m"
    };
    let payload = JSON.stringify(time);
    request(app)
      .post("/api/indicesprofile/ohlcdata/" + id)
      .send(payload)
      .set("Content-type", "application/json")
      .then(res => {
        expect(res.status).toBe(200);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("Retrieved Data successfully");
        done();
      });
  });

  it("(Should not return OHLC Data) should return a status code of 400,a message in the body,the data should be an object", done => {
    let id = 3211;
    let time = {
      time: "1w"
    };
    let payload = JSON.stringify(time);
    request(app)
      .post("/api/indicesprofile/ohlcdata/" + id)
      .send(payload)
      .set("Content-type", "application/json")
      .then(res => {
        expect(res.status).toBe(400);
        expect(res.body).toEqual(expect.any(Object));
        expect(res.body.data).toEqual(expect.any(Object));
        expect(res.body.message).toBe("No Data Found");
        done();
      });
  });
});
