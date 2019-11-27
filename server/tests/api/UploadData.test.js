const request = require("supertest");
const app = require("../../index");
const fs = require("mz/fs");

let id = 1;
let testFilePath = null;
describe('POST /api/upload/updateCompany/" + id - upload a new data file', () => {
  const filePath = `${__dirname}/Data/sample_import.csv`;

  // Upload first test file to CDN
  it("should upload the test file to UPloadedData", () =>
    // Test if the test file is exist
    fs.exists(filePath).then(exists => {
      if (!exists) throw new Error("file does not exist");
      return (
        request(app)
          .post("/api/upload/updateCompany/" + id)
          // Attach the file with key 'file' which is corresponding to your endpoint setting.
          .attach("file", filePath)
          .then(res => {
            const { success, message, filePath } = res.body;
            expect(success).toBeTruthy();
            expect(message).toBe("Uploaded successfully");
            expect(typeof filePath).toBeTruthy();
            // store file data for following tests
            testFilePath = filePath;
          })
          .catch(err => console.log(err))
      );
    }));
});

describe("DELETE /api/upload/updateCompany/ - delete an existing file", () => {
  it("should delete existing file successfully", () => {
    return request(app)
      .delete(`/api/upload/updateCompany/${testFilePath}`)
      .then(res => {
        const { success, message } = res.body;
        expect(success).toBeTruthy();
        expect(message).toBe("Delete successfully");
      })
      .catch(err => console.log(err));
  });
});
