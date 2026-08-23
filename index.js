require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");

const app = express();

app.use(cors());
app.use(express.json());

const uri = process.env.MONGODB_URI;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

const database = client.db("muDatabase");
const saveNews = database.collection("saveNewsData");
const usersCollection = database.collection("userData");

// Home route
app.get("/", (req, res) => {
  res.send("Dragon News Server is Running");
});

// Save news
app.post("/markNews", async (req, res) => {
  try {
    const markData = req.body;

    const result = await saveNews.insertOne(markData);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to save news",
      error: error.message,
    });
  }
});

// Save user
app.post("/userData", async (req, res) => {
  try {
    const user = req.body;

    const result = await usersCollection.insertOne(user);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to save user",
      error: error.message,
    });
  }
});

// Get bookmark
app.get("/bookMark", async (req, res) => {
  try {
    const email = req.query.email;

    const query = {
      userEmail: email,
    };

    const result = await saveNews.find(query).toArray();

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to get bookmarks",
      error: error.message,
    });
  }
});

// Delete bookmark
app.delete("/bookMark/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const query = {
      _id: new ObjectId(id),
    };

    const result = await saveNews.deleteOne(query);

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send({
      message: "Failed to delete bookmark",
      error: error.message,
    });
  }
});

// MongoDB connection test
client
  .db("admin")
  .command({ ping: 1 })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

module.exports = app;