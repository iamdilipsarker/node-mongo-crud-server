const express = require("express");
const cors = require("cors");
const app = express();
const { MongoClient, ServerApiVersion } = require("mongodb");
const port = process.env.PORT || 5000;

//use middleware
app.use(cors());
app.use(express.json());

//user: dbuser1
//pass: OAKSwXkVqhx9QewC

const uri =
  "mongodb+srv://dbuser1:OAKSwXkVqhx9QewC@node-mongo-crud.ybwscxn.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    const userCollection = client.db("node-mongo-crud").collection("users");

    app.get("/users", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      res.send(result);
      console.log(result);
    });
  } finally {
  }
}
run().catch((error) => console.log(error));

app.get("/", (req, res) => {
  res.send("hello from node mongo server");
});

app.listen(port, () => {
  console.log(`Listening to port: ${port}`);
});
