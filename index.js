const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
require("dotenv").config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("products"));
app.use(fileUpload());
const port = process.env.PORT || 9999;

const uri = ` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swdno.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err) => {
  const productCollection = client.db("MamarDukan").collection("products");

  app.post("/addAdmin", (req, res) => {
    const admin = req.body;
    adminCollection
      .insertOne(admin)
      .then((result) => {
        res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  app.post("/addProduct", (req, res) => {
    const file = req.files.file;
    const name = req.body.name;
    const category = req.body.category;
    const department = req.body.department;
    const seller = req.body.seller;
    const size = req.body.size;
    const color = req.body.color;
    const date = new Date();
    const description = req.body.description;
    const price = req.body.price;
    const discount = req.body.discount;
    const brand = req.body.brand;
    const newImg = file.data;
    const encImg = newImg.toString("base64");
    var image = {
      contentType: file.mimetype,
      size: file.size,
      img: Buffer.from(encImg, "base64"),
    };

    productCollection
      .insertOne({
        name,
        category,
        department,
        seller,
        color,
        size,
        description,
        image,
        price,
        discount,
        brand,
        date,
      })
      .then((result) => {
        res.send(result.insertedCount > 0);
      })
      .catch((err) => console.log(err));
  });

  app.get("/getProduct", (req, res) => {
    productCollection.find({}).toArray((err, documents) => {
      res.send(documents);
    });
  });

  app.get("/getProduct/:id", (req, res) => {
    productCollection
      .find({ _id: ObjectID(req.params.id) })
      .toArray((err, result) => {
        res.send(result[0]);
      });
  });

  app.post("/isAdmin", (req, res) => {
    const email = req.body.email;
    console.log(email);
    adminCollection.find({ email: email }).toArray((err, result) => {
      console.log(result);
      res.send(result.length > 0);
    });
  });
  app.delete("/delete/:id", (req, res) => {
    productCollection
      .deleteOne({ _id: ObjectID(req.params.id) })
      .then((result) => {
        res.send(result.deletedCount > 0);
      });
  });
});

app.listen(port);
