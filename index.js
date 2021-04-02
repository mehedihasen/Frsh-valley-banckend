const express = require('express')
const cors = require('cors')
const bodyParser =require('body-parser')
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://freshValley:9c4ivl4nlpycOT3b@cluster0.h8zf7.mongodb.net/freshStore?retryWrites=true&w=majority`;

const port = process.env.PORT ||4200;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express()

app.use(cors());
app.use(bodyParser.json());


client.connect(err => {
    console.log(err);
  const collection = client.db("freshStore").collection("addproduct");
  const OrderCollection = client.db("freshStore").collection("orderinfo");

app.get("/product", (req, res)=>{
  collection.find()
  .toArray((err, item)=>{
    res.send(item)
  })
})

app.get("/Oder", (req, res)=>{
  OrderCollection.find()
  .toArray((err, item)=>{
    res.send(item)
  })
})

app.post("/addproduct",(req, res)=>{
  const product = req.body;
  collection.insertOne(product)
  .then(result=>{
    res.send(result.insertedCount > 0)
  })
})

app.post("/addorder",(req, res)=>{
  const product = req.body;
  OrderCollection.insertOne(product)
  .then(result=>{
    res.send(result.insertedCount > 0)
  })
})

// app.delete("/delete/:id", (req, res) =>{
//   console.log(req.params.id);
// })

app.get("/", (req, res)=>{
  res.send("hello world")
})

//   client.close();
});



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})