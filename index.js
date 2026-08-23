
require("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors")
const port = process.env.PORT || 1000
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');


app.use(cors())
app.use(express.json())



const uri = `mongodb://hello:ciXyUvRB8H3lbpgZ@ac-mtmgpz4-shard-00-00.2kiuxiv.mongodb.net:27017,ac-mtmgpz4-shard-00-01.2kiuxiv.mongodb.net:27017,ac-mtmgpz4-shard-00-02.2kiuxiv.mongodb.net:27017/?ssl=true&replicaSet=atlas-8375j8-shard-0&authSource=admin&appName=Cluster0&compressors=zlib`
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

// const saveNews = 

async function runGetStarted() {



  try {
    //data base collection
    const database = client.db("muDatabase")
    const saveNews = database.collection("saveNewsData")
    const usersCollaction = database.collection("userData")

    app.post("/markNews", async (req, res) => {
      const markData = req.body
      const result = await saveNews.insertOne(markData)
      res.send(result)
    })
    app.post("/userData", async (req, res) => {
      const user = req.body;

      const result = await usersCollaction.insertOne(user)
      res.send(result)
    })
    app.get("/bookMark", async (req, res) => {
      const email = req.query.email
      const query = {
        userEmail: email
      }
      const result = await saveNews
        .find(query)
        .toArray();

      console.log(result);

      res.send(result);
    });

  
    app.delete("/bookMark/:id", async (req, res) => {
      const id = req.params.id
      const query = { _id: new ObjectId(id) }
      const result = await saveNews.deleteOne(query)
      res.send(result)
    })



    const result = await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    // Queries for a movie that has a title value of 'Back to the Future'

  } finally {


  }
}
runGetStarted()



app.get('/', (req, res) => {
  res.send('Hello World!')
})

export default app