const app = require("../server");
const supertest = require("supertest");
const Product = require("../models/productModel");

const request = supertest(app);

let token;

const product = {
  category: "60fa29810d6e39146a03512c",
  title: "Bacon & Cheese Potato Skins",
  description: "Bacon & Cheese Potato Skins",
  price: 5.5,
  inStock: 55,
};

beforeAll(done => {
  //Sign In with admin account to test use cases
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
  test("Getting all Products should return array", () => {
    return request.get("/api/product").then(response => {
      expect(response.status).toBe(200);
      expect(Array.isArray(response.body.data)).toBe(true);
    });
  });
});

describe("POST /", () => {
  test("Creating a product should require authorization", () => {
    return request
      .post("/api/product")
      .send(product)
      .then(response => {
        expect(response.status).toBe(401);
      });
  });
  test("Creating a category responds with JSON and the created product", () => {
    return request
      .post("/api/product")
      .set("Authorization", `Bearer ${token}`)
      .send(product)
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.type).toBe("application/json");
        expect(response.body.data.title).toBe("Bacon & Cheese Potato Skins");
      });
  });
});

describe("PUT /", () => {
  test("Product item should be updated successfully", async () => {
    const newProduct = await Product.create({
      title: "Southern Fried Chicken wih BBQ Sauce",
      description: "Southern Fried Chicken wih BBQ Sauce",
      price: 4.59,
      category: "60f57b61de79165d14715bfe",
      inStock: 103,
    });
    return await request
      .put(`/api/product/${newProduct.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        inStock: 93,
      })
      .then(response => {
        expect(response.status).toBe(201);
        expect(newProduct.inStock - response.body.data.inStock).toBe(10);
      });
  });
});

describe("DELETE /", () => {
  test("Product item should be deleted successfully", async () => {
    const newProduct = await Product.create({
      title: "Garlic Bread with Vegan Mozzarella",
      description: "Garlic Bread with Vegan Mozzarella",
      price: 4.99,
      category: "60f57b61de79165d14715bfe",
      inStock: 89,
    });
    return await request
      .delete(`/api/product/${newProduct.id}`)
      .set("Authorization", `Bearer ${token}`)
      .then(response => {
        expect(response.status).toBe(202);
        expect(response.body.message).toBe("Product removed successfully");
      });
  });
});
