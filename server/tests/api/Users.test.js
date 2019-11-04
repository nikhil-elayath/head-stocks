const request = require("supertest");
const app = require("../../index");

describe("Testing Users API", () => {
  it("(View all Users) should return a status code of 200,the body should be an object,a message in the body,the data should be an array", done => {
    request(app)
      .get("/api/users/all")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.data).toEqual(expect.any(Array));
        expect(response.body.message).toBe("Retrieved all users Successfully");
        done();
      });
  });

  //   it("(Create a new user) should return a status of 200 and a success message on creation of a new user", done => {
  //     let data = {
  //       name: "Piyush Gupta",
  //       email: "guptapiyush@gmail.com",
  //       phone: "7418529635",
  //       password: "guptapiyush03",
  //       isAdmin: false
  //     };
  //     let payload = JSON.stringify(data);
  //     console.log(payload);
  //     request(app)
  //       .post("/api/users/signup")
  //       .send(payload)
  //       .set("Content-type", "application/json")
  //       .then(response => {
  //         console.log("response.body", response);
  //         expect(response.status).toBe(200);
  //         expect(response.body).toEqual(expect.any(Object));
  //         expect(response.body.message).toBe("Created One user Successfully");
  //         done();
  //       });
  //   });

  it("(Successful Login) should return a status of 200  when user logs in successfully", done => {
    let data = {
      email: "guptabhavana49@gmail.com",
      password: "bhavanagupta",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Logged in successfully");
        done();
      });
  });

  it("(Invalid Credentials) should return a status of 400", done => {
    let data = {
      name: "bhavanagupta250",
      password: "bhavanagupta2",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Account not found");
        done();
      });
  });

  it("Should show a error message when an input field(name) is empty", done => {
    let data = {
      name: "",
      email: "helloworld@gmail.com",
      phone: "5461237894",
      password: "helloworld123",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/signup")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toBe('"name" is not allowed to be empty');
        done();
      });
  });

  it("Should show a error message when an input field(email) is empty", done => {
    let data = {
      name: "helloworld",
      email: "",
      phone: "5461237894",
      password: "helloworld123",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/signup")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toBe('"email" is not allowed to be empty');
        done();
      });
  });

  it("Should show a error message when an input field(phone) is empty", done => {
    let data = {
      name: "helloworld",
      email: "helloworld@gmail.com",
      phone: "",
      password: "helloworld123",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/signup")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toBe('"phone" is not allowed to be empty');
        done();
      });
  });

  it("Should show a error message when an input field(password) is empty", done => {
    let data = {
      name: "helloworld",
      email: "helloworld@gmail.com",
      phone: "5461237894",
      password: "",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/signup")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toBe('"password" is not allowed to be empty');
        done();
      });
  });

  it("Should show a error message when an length of password is less than the minimum length specified", done => {
    let data = {
      name: "helloworld",
      email: "helloworld@gmail.com",
      phone: "5461237894",
      password: "test1",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/signup")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toBe(
          '"password" length must be at least 6 characters long'
        );
        done();
      });
  });

  it("Should show a error message when an length of name is less than the minimum length specified", done => {
    let data = {
      name: "Bg",
      email: "helloworld@gmail.com",
      phone: "5461237894",
      password: "testcase123",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/signup")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toBe(
          '"name" length must be at least 5 characters long'
        );
        done();
      });
  });

  it("Should show a error message when an length of phone is less than the minimum length specified", done => {
    let data = {
      name: "HelloWorld",
      email: "helloworld@gmail.com",
      phone: "5461237",
      password: "testcase123",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/signup")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toBe(
          '"phone" length must be at least 10 characters long'
        );
        done();
      });
  });

  it("Should show a error message when an length of email is less than the minimum length specified", done => {
    let data = {
      name: "HelloWorld",
      email: "hellowor",
      phone: "7418529635",
      password: "testcase123",
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/signup")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.text).toBe(
          '"email" length must be at least 10 characters long'
        );
        done();
      });
  });
});
