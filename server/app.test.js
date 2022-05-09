const supertest = require("supertest");
const app = require("./app");

describe("Sample Test", () => {
  it("should test that true === true", () => {
    expect(true).toBe(true);
  });
});

describe("GET /allUserList", () => {
  describe("Get all UserList", () => {
    it("responds with json", function (done) {
      supertest(app)
        .get("api/allUserList")
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200, done);
    });
  });
});
