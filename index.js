
require("dotenv").config();

const express = require('express');
const app = express();
const cors = require("cors")
const port = process.env.PORT || 1000
const { MongoClient, ServerApiVersion } = require('mongodb');


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

async function runGetStarted() {
  // Replace the uri string with your connection string


  try {


    const result = await client.db('admin').command({ ping: 1 });
    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!'
    );

    // Queries for a movie that has a title value of 'Back to the Future'

  } finally {
    await client.close();

  }
}
runGetStarted().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})