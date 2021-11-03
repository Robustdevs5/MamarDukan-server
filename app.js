const express = require("express");
const app = express();
const morgan = require('morgan');
const bodyParser = require("body-parser");
const passport = require("passport");


/**************** morgan use for auto consol.log() ****************************/
app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// require("./api/middleware/passport")(passport);


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
const ProductsRouts = require('./api/routes/Products/Products');
const orderRouts = require('./api/routes/Order/orders');
const userRouts = require('./api/routes/Users/Users');
const reviewRouts = require('./api/routes/review/Review');
const blogRouts = require('./api/routes/Blog/Blogs');
const MessageRouts = require('./api/routes/Message/Message');
const reportRouts = require('./api/routes/Report/report');

app.use('/products', ProductsRouts);
app.use('/orders', orderRouts);
app.use('/user', userRouts);
app.use('/review', reviewRouts)
app.use('/blogs', blogRouts)
app.use('/message', MessageRouts)
app.use('/report', reportRouts)



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


module.exports = app;
