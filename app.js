const express = require("express");
const app = express();
// const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;
// const cors = require("cors");
// const bodyParser = require("body-parser");
// require("dotenv").config();

// app.use(cors());
// app.use(bodyParser.json());

// app.get("/", (req, res) => {
//   res.send("Welcome (^.^) ");
// });

// All API Routes
const ProductsRouts = require('./api/routes/Products');

app.use('/products', ProductsRouts);



app.use((req, res, next) => {
  res.status(200).json({
    message: 'it works!'
  });
});

module.exports = app;


// const port = process.env.PORT || 5000;
// app.listen(port, (err) =>
//   err
//     ? console.log("Filed to Listen on Port", port)
//     : console.log("Listing for Port", port)
// );
