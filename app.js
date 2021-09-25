const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
// const MongoClient = require("mongodb").MongoClient;
// const ObjectID = require("mongodb").ObjectID;
// const cors = require("cors");
// require("dotenv").config();

// app.use(cors());


// app.get("/", (req, res) => {
//   res.send("Welcome (^.^) ");
// });

// morgan use for auto consol.log()
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());


// this is cors origin control of our api
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Here * means we allow all website to access our api, if we want ,does not allow anyone access our api just put website url replace the * start
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods',
      'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
    }
    next();
});



// All API Routes
const ProductsRouts = require('./api/routes/Products');
const orderRouts = require('./api/routes/orders');

app.use('/products', ProductsRouts);
app.use('/orders', orderRouts);



// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'it works!'
//   });
// });

app.use((req, res, next) => {
 
  const error = new Error('Not found');
  error.status = 404;
  next(error);

});

app.use((error, req, res,  next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;


// const port = process.env.PORT || 5000;
// app.listen(port, (err) =>
//   err
//     ? console.log("Filed to Listen on Port", port)
//     : console.log("Listing for Port", port)
// );
