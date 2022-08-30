const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

let token;

beforeAll(done => {
  //Sign In with admin account to test use cases
  request
    .post("/api/auth/login")
    .send({
      email: "test@testadmin.com",
      password: "testadmin123",
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

describe("GET /", () => {
  test("It should get all user's orders as an admin account", async () => {
    return await request
      .get("/api/order")
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
      });
  });
});

describe("PUT /", () => {
  // token not being sent - should respond with a 401
  test("Updating an order should require authorization", () => {
    return request
      .put("/api/order/60fa30f3b5eddd16d760d581")
      .send({ status: "On it's way!" })
      .then(response => {
        expect(response.status).toBe(401);
      });
  });
  // send the token - should respond with a 201
  test("Admin account should be able to update successfully with token", () => {
    return request
      .put("/api/order/60fa30f3b5eddd16d760d581")
      .set("Authorization", `Bearer ${token}`)
      .send({ status: "Cancelled" })
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Order updated successfully");
        expect(response.body.data.status).toBe("Cancelled");
      });
  });
});
