const request = require("supertest");
const app = require("../../index");
// let testFilePath = null;
import file from "../Data/sample_import.csv";

describe("Testing Upload Data API", () => {
  it("(Data Uploads) should return a status of 200", done => {
    //   id = 9;
    //   // const filePath = `${__dirname}/Data/sample_import.csv`;
    //   let data = { file };
    //   let payload = JSON.stringify(data);
    //   request(app)
    //     .post("/api/upload/updateCompany/" + id)
    //     .send(payload)
    //     .set("Content-type", "application/json")
    //     .then(response => {
    //       expect(response.status).toBe(200);
    //       expect(response.body).toEqual(expect.any(Object));
    //       expect(response.body.message).toBe("Updated Data Successfully");
    //       done();
    //     });
  });
});

// describe('uploads a new Data file', () => {

//   // Upload first test file to CDN
//   it('should upload the test file to CDN', () =>
//     // Test if the test file is exist
//     fs.exists(filePath)
//       .then((exists) => {
//         if (!exists) throw new Error('file does not exist');
//         return request(app)
//           .post("/api/upload/updateCompany/" + id)
//            .attach('file', filePath)
//           .then((res) => {
//             const { success, message, filePath } = res.body;
//             expect(success).toBeTruthy();
//             expect(message).toBe('Updated Data Successfully');
//             expect(typeof filePath).toBeTruthy();
//             // store file data for following tests
//             testFilePath = filePath;

//           })
//           .catch(err => console.log(err));
//       })

// })
