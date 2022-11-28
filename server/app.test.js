const supertest = require("supertest");
const { response } = require("./app");
const app = require("./app");

// //Below TestCase check whether allUserList GET API IS WORKING OR NOT
describe("GET /allUserList", () => {
  describe("Get all UserList", () => {
    it("responds with json", function (done) {
      supertest(app)
        .get("/api/allUserList")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});

// //Below TestCase check whether allEventList GET API IS WORKING OR NOT
describe("GET /allEventList", () => {
  describe("Get all approved EventList", () => {
    it("responds with json", function (done) {
      supertest(app)
        .get("/api/allEvents")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});

//Below TestCase to test LOGIN API (With right credentials)
describe("POST /login", function () {
  it("Succesfull login should return 200", function (done) {
    supertest(app)
      .post("/api/login")
      .send({ email: "mp32445@gmail.com", password: "12345678" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
//Below TestCase to test LOGIN API (With wrong credentials)
describe("POST /login", function () {
  it("Invalid login should return 300", function (done) {
    supertest(app)
      .post("/api/login")
      .send({ email: "mp32445@gmail.com", password: "123456" })
      .set("Accept", "application/json")
      .expect({ error: "Invalid User Credentials", status: "404" })
      .end(function (err, res) {
        console.log(done);
        if (err) return done(err);
        return done();
      });
  });
});

// //Below Testcase to test SignUp API (Whether User is being created or not)
describe("POST /signup", function () {
  it("Succesfull Signup should return Succesfull status", function (done) {
    supertest(app)
      .post("/api/register")
      .send({
        name: "Anuj Rautela",
        email: "anuj@gmail.com",
        password: "123456",
        phoneno: "1234567890",
        role: "Student",
        course: "M.Tech",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ status: "Succesfull" })
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

// //Below Testcase to test SignUp API (Whether it's detecting duplicate email or not)
describe("POST /signup", function () {
  it("Signing up with duplicate email will return Error Status", function (done) {
    supertest(app)
      .post("/api/register")
      .send({
        name: "Meet Patel",
        email: "mp32445@gmail.com",
        password: "123456",
        phoneno: "1234567890",
        role: "Student",
        course: "M.Tech",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ status: "error", error: "Duplicate Email" })
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

//Below Testcase to test ForgetPassword API (Whether it's working or not)
describe("POST /forgetpassword", function () {
  it("Succefull generation of ForgetPassword API will return Succesfull Status", function (done) {
    supertest(app)
      .post("/api/forgetpassword")
      .send({
        email: "anuj@gmail.com",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ status: "Succesfull" })
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});

//Below Testcase to test ForgetPassword API (USER NOT PRESENT SCENARIO)
describe("POST /forgetpassword", function () {
  it("Unable to send forgetpassword email as USER NOT PRESENT", function (done) {
    supertest(app)
      .post("/api/forgetpassword")
      .send({
        email: "xyz@gmail.com",
      })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect({ status: "user not present" })
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
