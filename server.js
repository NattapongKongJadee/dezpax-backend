const express = require("express");
const fs = require("fs");
const app = express();
const authRoutes = require("./routes/auth");
const authenticate = require("./middleware/auth");
const bodyParser = require("body-parser");
const cors = require("cors");
const { addUser, users } = require("./model/user");

app.use(express.json());
app.use(bodyParser.json());
app.use(
  cors({
    origin: `${process.env.FRONTEND_URL}`, //FrontEnd URL
  })
);

const initUser = async () => {
  const defaultEmail = "user@example.com";
  const defaultPassword = "123";
  try {
    await addUser(defaultEmail, defaultPassword);
    console.log(`Default user created: ${defaultEmail}`);
  } catch (e) {
    console.log(`Default user already exists: ${e}`);
  }
};

initUser();

app.use("/api/auth", authRoutes);
app.use("/api/protected", authenticate, (req, res) => {
  res.json({ message: "protected", user: req.user });
});

const PORT = process.env.PORT;
const PRODUCTS_FILE = "./products.json";

const getProducts = () => {
  const data = fs.readFileSync(PRODUCTS_FILE);
  return JSON.parse(data);
};

const saveProducts = (products) => {
  fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
};

// 1. GET:
app.get("/products", (req, res) => {
  const products = getProducts();
  res.json(products);
});

// 2. GET: specific id
app.get("/products/:id", (req, res) => {
  const products = getProducts();
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }
  res.json(product);
});

// 3. POST:
app.post("/products", (req, res) => {
  const products = getProducts();
  const newProduct = {
    id: products.length ? products[products.length - 1].id + 1 : 1,
    ...req.body,
  };
  products.push(newProduct);
  saveProducts(products);
  console.log("Updated new item sucessfully ! ");

  res.status(201).json(newProduct);
});

// 4. PUT:
app.put("/products/:id", (req, res) => {
  const products = getProducts();
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).json({ message: "Not match product with exist id" });
  }
  products[productIndex] = { ...products[productIndex], ...req.body };
  saveProducts(products);
  res.json(products[productIndex]);
});

// 5. DELETE:
app.delete("/products/:id", (req, res) => {
  let products = getProducts();
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).json({ message: "Not match product with exist id" });
  }
  const deletedProduct = products.splice(productIndex, 1);
  saveProducts(products);
  console.log("Deleted Item successfully");

  res.json(deletedProduct);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server Backend  is running on http://localhost:${PORT}`);
});
