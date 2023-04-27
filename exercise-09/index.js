const express = require("express");

// import { MongoClient } from 'mongodb'
const { MongoClient, ObjectId } = require("mongodb");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connecting URL
const url = "mongodb://localhost:27017";
const client = new MongoClient(url);

// Naming DB
const dbName = "exercise9";
let db;
let collection;

const main = async () => {
  await client.connect();
  console.log("Connected Successfully to Server");
  db = client.db(dbName);
  collection = db.collection("users");

  return "done";
};

main();

// Create User
app.post("/createUser", async (req, res) => {
  try {
    await collection.insertOne({ name: req.body.name, age: req.body.age, status: req.body.status });
    res.json({ message: "User Data Entered Successfully" });
  } catch (error) {
    console.log(error);
  }
});

// Read Users
app.get("/", async (req, res) => {
  try {
    const findResult = await collection.find({}).toArray();
    res.json({ findResult });
  } catch (error) {
    console.log(error);
  }
});

// Update User with ID
app.patch("/updateUser/:id", async (req, res) => {
  try {
    await collection.updateOne({ _id: new ObjectId(`${req.params.id}`) }, { $set: { name: req.body.name, age: parseInt(req.body.age), status: req.body.status } });

    res.json({ message: `Document Updated, ID: ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
});

// Delete User with ID
app.delete("/deleteUser/:id", async (req, res) => {
  try {
    await collection.deleteOne({ _id: new ObjectId(`${req.params.id}`) });
    res.json({ message: `Document Deleted, ID: ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
});
app.listen(port, () => console.log(`Server Running at http://localhost:${port}`));