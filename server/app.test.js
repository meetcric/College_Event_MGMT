const supertest = require("supertest");
const { response } = require("./app");
const app = require("./app");

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

describe("POST /login", function () {
  it("Succesfull login should return 200", function (done) {
    supertest(app)
      .post("/api/login")
      .send({ email: "meet@gmail.com", password: "123456" })
      .set("Accept", "application/json")
      .expect("Content-Type", /json/)
      .expect(200)
      .end(function (err, res) {
        if (err) return done(err);
        return done();
      });
  });
});
describe("POST /login", function () {
  it("Invalid login should return 300", function (done) {
    supertest(app)
      .post("/api/login")
      .send({ email: "meet@gmail.com", password: "1234567" })
      .set("Accept", "application/json")
      .expect({ error: "Invalid User Credentials", status: "404" })
      .end(function (err, res) {
        console.log(done);
        if (err) return done(err);
        return done();
      });
  });
});
