const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

let token;

beforeAll(done => {
  request
    .post("/api/auth/login")
    .send({
      email: "test@testadmin.com",
      password: "testadmin123",
    })
    .end((err, response) => {
      token = response.body.token; // save the token!
      done();
    });
});

describe("GET /", () => {
  test("Getting all Categories should return array", () => {
    return request.get("/api/category").then(response => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});

describe("POST /", () => {
  // token not being sent - should respond with a 401
  test("Creating a category should require authorization", () => {
    return request
      .post("/api/category")
      .send({
        name: "Starter",
      })
      .then(response => {
        expect(response.status).toBe(401);
      });
  });
  // send the token - should respond with a 200
  test("It responds with JSON", () => {
    return request
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Starter",
      })
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
      });
  });
});
