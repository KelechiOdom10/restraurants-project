const app = require("../server");
const supertest = require("supertest");

const request = supertest(app);

let token;

const order = {
  products: [
    {
      name: "Dough Balls",
      quantity: 6,
      price: "4.99",
      product: "60f58ab3cc374a63f937b698",
    },
  ],
  address: "Flat 1234, WC1N 1AS",
  phoneNumber: "+42172376669",
  total: 29.94,
};

const order1 = {
  products: [
    {
      name: "Garlic Pizza Bread",
      quantity: 3,
      price: "4.59",
      product: "60f58ab3cc374a63f937b69a",
    },
  ],
  address: "House 4, NW545 7R5",
  phoneNumber: "+4728972376669",
  total: 13.77,
};

beforeAll(done => {
  //Sign In with regular user account to test use cases
  request
    .post("/api/auth/login")
    .send({
      email: "john.doe@testdomain.com",
      password: "Testvjuwbh",
    })
    .end((err, response) => {
      token = response.body.token;
      done();
    });
});

describe("POST /", () => {
  // send the token - should respond with a 201
  test("Logged in User should be able to create Order", () => {
    return request
      .post("/api/order")
      .set("Authorization", `Bearer ${token}`)
      .send(order)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe(
          "Thanks for your order! We will contact you to confirm the order."
        );
        expect(response.body.data.total).toBe(29.94);
      });
  });

  test("Logged in User should be able to create Order", () => {
    return request
      .post("/api/order")
      .set("Authorization", `Bearer ${token}`)
      .send(order1)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe(
          "Thanks for your order! We will contact you to confirm the order."
        );
        expect(response.body.data.total).toBe(13.77);
      });
  });
});

describe("GET /", () => {
  test("Logged in User should be able to get their orders", async () => {
    return await request
      .get("/api/order/myorders")
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.data)).toBe(true);
        expect(response.body.data.length).toBe(2); // We've just created 2 orders above with same user
      });
  });

  test("It should only allow admin accounts get all orders", async () => {
    return await request
      .get("/api/order/")
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.status).toBe(403);
      });
  });
});
