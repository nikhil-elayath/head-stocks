const request = require("supertest");
const app = require("../../index");

describe("Testing Users API", () => {
  // To get all the users
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

  // To create a new user and return a status of 200
  // it("(Create a new user) should return a status of 200 and a success message on creation of a new user", done => {
  //   let data = {
  //     name: "Piyush",
  //     email: "guptapiyush@gmail.com",
  //     phone: "7418529635",
  //     password: "piyush",
  //     isAdmin: false
  //   };
  //   let payload = JSON.stringify(data);
  //   console.log(payload);
  //   request(app)
  //     .post("/api/users/signup")
  //     .send(payload)
  //     .set("Content-type", "application/json")
  //     .then(response => {
  //       console.log("response.body", response);
  //       expect(response.status).toBe(200);
  //       expect(response.body).toEqual(expect.any(Object));
  //       expect(response.body.message).toBe("Created One user Successfully");
  //       done();
  //     });
  // });

  // Successfull login should return status of 200
  it("(Successful Login) should return a status of 200  when user logs in successfully", done => {
    let data = {
      email: "guptabhavana49@gmail.com",
      password: "bhavanagupta"
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

  // Login should be unsucessfull if the credentials are invalid
  it("(Invalid Credentials) should return a status of 400", done => {
    let data = {
      name: "bhavanagupta250",
      password: "bhavanagupta2"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/login")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.status).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("*Account not found");
        done();
      });
  });

  // Should not create a new user if the name field is empty
  it("Should show a error message when an input field(name) is empty", done => {
    let data = {
      name: "",
      email: "helloworld@gmail.com",
      phone: "5461237894",
      password: "helloworld123"
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

  // Should not create a new user if the email field is empty
  it("Should show a error message when an input field(email) is empty", done => {
    let data = {
      name: "helloworld",
      email: "",
      phone: "5461237894",
      password: "helloworld123"
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

  // Should not create a new user if the phone field is empty
  it("Should show a error message when an input field(phone) is empty", done => {
    let data = {
      name: "helloworld",
      email: "helloworld@gmail.com",
      phone: "",
      password: "helloworld123"
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

  // Should not create a new user if the password field is empty
  it("Should show a error message when an input field(password) is empty", done => {
    let data = {
      name: "helloworld",
      email: "helloworld@gmail.com",
      phone: "5461237894",
      password: ""
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

  // Should not create a new user if the length of the password field doesn't satisfy the condition
  it("Should show a error message when an length of password is less than the minimum length specified", done => {
    let data = {
      name: "helloworld",
      email: "helloworld@gmail.com",
      phone: "5461237894",
      password: "test1"
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

  // Should not create a new user if the length of the name field doesn't satisfy the condition
  it("Should show a error message when an length of name is less than the minimum length specified", done => {
    let data = {
      name: "Bg",
      email: "helloworld@gmail.com",
      phone: "5461237894",
      password: "testcase123"
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

  // Should not create a new user if the length of the phone field doesn't satisfy the condition
  it("Should show a error message when an length of phone is less than the minimum length specified", done => {
    let data = {
      name: "HelloWorld",
      email: "helloworld@gmail.com",
      phone: "5461237",
      password: "testcase123"
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

  // Should not create a new user if the length of the email field doesn't satisfy the condition
  it("Should show a error message when an length of email is less than the minimum length specified", done => {
    let data = {
      name: "HelloWorld",
      email: "hellowor",
      phone: "7418529635",
      password: "testcase123"
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

  // SHould reset the password successfully if the email exists
  it("Should reset the password successfully if the email exists", done => {
    let data = {
      email: "guptabhavana49@gmail.com",
      password: "bhavanagupta"
    };
    let payload = JSON.stringify(data);
    request(app)
      .put("/api/users/reset_password")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Your password has been updated");
        done();
      });
  });

  // Should not reset if the uuser with eamil deosn't exists
  it("Should not reset the password  if the email doesn't exists", done => {
    let data = {
      email: "guptabhava49@gmail.com",
      password: "bhavanagupta"
    };
    let payload = JSON.stringify(data);
    request(app)
      .put("/api/users/reset_password")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Invalid Credentials");
        done();
      });
  });

  // Send the email to the user to the registered email
  it("Should send the mail to the user if the email specified is correct", done => {
    let data = {
      email: "guptabhavana49@gmail.com"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/send_otp")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Email send successfully");
        done();
      });
  });

  // Should not send the email if the user is not registered
  it("Should not send the mail to the user if the email specified is incorrect", done => {
    let data = {
      email: "guptabhana49@gmail.com"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/send_otp")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Invalid Credentials");
        done();
      });
  });

  // Verify the otp if the otp entered is correct
  it("Should verify the otp and return a success message if the otp is valid", done => {
    let data = {
      otp: 1234
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/verify_otp")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Email verified");
        done();
      });
  });

  // Show an error if the otp entered is invalid
  it("Should verify the otp and return a error message if the otp is invalid", done => {
    let data = {
      otp: "1238"
    };
    let payload = JSON.stringify(data);
    request(app)
      .post("/api/users/verify_otp")
      .send(payload)
      .set("Content-type", "application/json")
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual(expect.any(Object));
        expect(response.body.message).toBe("Invalid OTP.");
        done();
      });
  });
});
