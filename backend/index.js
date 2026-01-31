const express = require("express");
const cors = require("cors");
const { connectDB, getDB } = require("./config/db");
const products = require("./store/products");

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for all domains
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// Parse JSON bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Express server!" });
});

// Health check route
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() });
});

// Get all products from MongoDB
app.get("/api/products", async (req, res) => {
  try {
    const db = getDB();
    const productList = await db.collection("products").find({}).toArray();
    res.json(productList);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching products", error: error.message });
  }
});

// Get single product by ID
app.get("/api/products/:id", async (req, res) => {
  try {
    const db = getDB();
    const product = await db
      .collection("products")
      .findOne({ id: parseInt(req.params.id) });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching product", error: error.message });
  }
});

// Seed products to MongoDB (run once)
app.post("/api/seed", async (req, res) => {
  try {
    const db = getDB();
    const collection = db.collection("products");

    // Clear existing products
    await collection.deleteMany({});

    // Insert products from store
    await collection.insertMany(products);

    res.json({
      message: "Products seeded successfully!",
      count: products.length,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error seeding products", error: error.message });
  }
});

// Connect to MongoDB and start server
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
