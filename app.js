const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
require("dotenv").config();


/**************** morgan use for auto consol.log() ****************************/
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());



/************************ Mongoose uri credential *************************/


const DATABASE_URL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.swdno.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

// const DATABASE_URL = process.env.Db_URL;
console.log('DATABASE_URL connected', DATABASE_URL)



/******************* this is cors origin control of our api *******************/
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // Here star (*) means we allow all website to access our api, if we want ,does not allow anyone access our api just put website url replace the * start
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



/****************** All API Routes ************************/
const ProductsRouts = require('./api/routes/Products');
const orderRouts = require('./api/routes/orders');

app.use('/products', ProductsRouts);
app.use('/orders', orderRouts);



/******************** Error handling ******************/
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



/*********************** Mongoose Connect with database ***************************/
mongoose.connect(DATABASE_URL)
.then(() => {
    console.log('database connected');
})
.catch(err => {
    console.log(err)
})



module.exports = app;
