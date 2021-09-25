const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config()

const PORT = process.env.PORT || 9999;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
  res.send('Welcome (^.^)');
})

app.listen(PORT)



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swdno.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

client.connect(err => {
  const productCollection = client.db("MamarDukan").collection("products");



  console.log("product collection ok")
});
