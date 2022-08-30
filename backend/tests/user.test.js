const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

const user1 = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@testdomain.com",
  password: "Testvjuwbh",
};

test("New user should be able to register and get successful response", async () => {
  const response = await request.post("/api/auth/register").send(user1);

  expect(response.status).toBe(201);
  expect(response.body.success).toBeTruthy();
  expect(response.body.message).toBe("User successfully created");
});

test("User should be able to login", async () => {
  const response = await request.post("/api/auth/login").send({
    email: user1.email,
    password: user1.password,
  });

  expect(response.status).toBe(200);
  expect(response.body.success).toBeTruthy();
  expect(response.body.message).toBe("Successfully logged in!");
});
