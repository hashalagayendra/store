const { MongoClient, ServerApiVersion } = require("mongodb");

const uri =
  "mongodb+srv://hasalagayendra360:895053805y@cluster0.v4k8pay.mongodb.net/?appName=Cluster0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db = null;

const connectDB = async () => {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ Successfully connected to MongoDB!");
    db = client.db("techstore");
    return db;
  } catch (error) {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  }
};

const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB first.");
  }
  return db;
};

const closeDB = async () => {
  await client.close();
  console.log("MongoDB connection closed");
};

module.exports = { connectDB, getDB, closeDB };
