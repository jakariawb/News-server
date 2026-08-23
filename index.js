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

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/bookMark", async (req, res) => {
  try {
    const email = req.query.email;

    const result = await saveNews
      .find({ userEmail: email })
      .toArray();

    res.send(result);
  } catch (error) {
    console.error("BOOKMARK ERROR:", error);

    res.status(500).send({
      message: "Failed to get bookmark",
      error: error.message,
    });
  }
});

app.post("/markNews", async (req, res) => {
  try {
    const markData = req.body;

    const result = await saveNews.insertOne(markData);

    res.send(result);
  } catch (error) {
    console.error("MARK NEWS ERROR:", error);

    res.status(500).send({
      message: "Failed to save news",
      error: error.message,
    });
  }
});

app.post("/userData", async (req, res) => {
  try {
    const user = req.body;

    const result = await usersCollection.insertOne(user);

    res.send(result);
  } catch (error) {
    console.error("USER ERROR:", error);

    res.status(500).send({
      message: "Failed to save user",
      error: error.message,
    });
  }
});

app.delete("/bookMark/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const result = await saveNews.deleteOne({
      _id: new ObjectId(id),
    });

    res.send(result);
  } catch (error) {
    console.error("DELETE ERROR:", error);

    res.status(500).send({
      message: "Failed to delete bookmark",
      error: error.message,
    });
  }
});

module.exports = app;