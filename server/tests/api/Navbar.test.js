const request = require("supertest");
const app = require("../../index");


describe("Testing Navbar API", () => {

it("(Search Results Found) should return a status of 200  when give the search results", done => {
    let data = {
      searchInput: "AAPL"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/navbar/search")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Retrieved Search Result successfully");
        done();
      });
  });

  
it("(Search Results Not Found) should return a status of 400  when does not give search results", done => {
    let data = {
      searchInput: "AAPLAAPL"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/navbar/search")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("No Data Found");
        done();
      });
  });

} );