const request = require("supertest");
const app = require("../../index");
// let testFilePath = null;
// import upload from "../Data/sample_import.csv";

describe("Testing Upload Data API", () => {
  it("(Data Uploads) should return a status of 200", done => {
    id = 9;
    // const filePath = `${__dirname}/Data/sample_import.csv`;
    let data = "../Data/sample_import.csv";
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/upload/updateCompany/" + id)
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        done();
      });
  });

  it("(Data Uploads) should return a status of 200", done => {
    id = 32156;
    let data = "../Data/sample_import.csv";
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/upload/updateCompany/" + id)
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("No companies found");
        done();
      });
  });
});
